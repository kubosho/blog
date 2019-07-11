NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

SRC_DIR := $(CURDIR)/src
DIST_DIR := $(CURDIR)/dist
TOOLS_DIR := $(CURDIR)/tools
ASSETS_DIR := $(CURDIR)/assets
INFRASTRUCTURE_DIR := $(CURDIR)/infrastructure

DOCKER_HUB_USER := kubosho
DOCKER_IMAGE_TAG_PREFIX := blog_
DOCKER_IMAGE_BACKEND := backend
DOCKER_IMAGE_REVERSE_PROXY := reverse_proxy

PWD_WIN := $(shell echo $(PWD) | sed -e 's/^\/mnt//')

####################################
# Command definition
####################################
AVA := $(NPM_BIN_DIR)/ava
CPX := $(NPM_BIN_DIR)/cpx
POSTCSS := $(NPM_BIN_DIR)/postcss
PRETTIER := $(NPM_BIN_DIR)/prettier
RIMRAF := $(NPM_BIN_DIR)/rimraf
TSC = $(NPM_BIN_DIR)/tsc
TSLINT := $(NPM_BIN_DIR)/tslint

ifeq ($(OS),Windows_NT)
	AVA = $(NPM_BIN_DIR)/ava.cmd
	CPX = $(NPM_BIN_DIR)/cpx.cmd
	POSTCSS := $(NPM_BIN_DIR)/postcss.cmd
	PRETTIER := $(NPM_BIN_DIR)/prettier.cmd
	RIMRAF = $(NPM_BIN_DIR)/rimraf.cmd
	TSC = $(NPM_BIN_DIR)/tsc.cmd
	TSLINT = $(NPM_BIN_DIR)/tslint.cmd
endif

####################################
# Self-documentize utility
####################################
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####################################
# Bootstrap
####################################
.PHONY: init
init: ## Install dependencies.
	yarn

####################################
# Clean
####################################
.PHONY: clean
clean: clean_dist ## Clean up before building the code.

.PHONY: clean_dist
clean_dist:
	$(RIMRAF) $(DIST_DIR)/*

####################################
# Build
####################################
.PHONY: build
build: clean build_script build_style build_nginx ## Building scripts and stylesheets.

.PHONY: build_script
build_script:
	$(TSC)

.PHONY: build_script_for_test
build_script_for_test:
	$(TSC) --project tsconfig_test.json

.PHONY: build_style
build_style:
	$(POSTCSS) $(ASSETS_DIR)/styles/index.pcss --config $(CURDIR)/postcss.config.js --output $(DIST_DIR)/assets/styles/index.css

.PHONE: build_nginx
build_nginx: PORT ?= 80
build_nginx: PROXY_PASS ?= http://backend:8080
build_nginx: NGINX_WORKERS ?= 1
build_nginx:
	PORT=$(PORT) \
	PROXY_PASS=$(PROXY_PASS) \
	NGINX_WORKERS=$(NGINX_WORKERS) \
	OUT_DIR=$(CURDIR)/nginx \
	go run $(CURDIR)/tools/nginx/generate_nginx_conf.go

####################################
# Test
####################################
.PHONY: test
test: ## Execute test cases.
	$(MAKE) build_script_for_test && \
	$(AVA)

.PHONY: update_snapshots
update_snapshots: build_script_for_test
	$(AVA) --update-snapshots

####################################
# Linter
####################################
.PHONY: lint
lint: lint_ts ## Lint scripts and stylesheets.

.PHONY: lint_ts
lint_ts:
	$(TSLINT) --config $(CURDIR)/tslint.json --project $(CURDIR)/tsconfig.json

####################################
# Formatter
####################################
.PHONY: format
format: format_ts ## Format scripts and stylesheets.

.PHONY: format_ts
format_ts:
	$(PRETTIER) --config $(CURDIR)/.prettierrc.js --write $(SRC_DIR)/**/*.{ts,tsx}

.PHONY: check_format
check_format: format
	git diff --exit-code

####################################
# Copy
####################################
.PHONY: copy
copy: copy_images copy_scripts ## Copy files from assets/ to dist/.

.PHONY: copy_images
copy_images:
	$(CPX) "$(ASSETS_DIR)/images/*.*" $(DIST_DIR)/assets/images

.PHONY: copy_scripts
copy_scripts:
	$(CPX) "$(ASSETS_DIR)/scripts/*.*" $(DIST_DIR)/assets/scripts

####################################
# Serve
####################################
.PHONY: serve
serve: ## Blog serving.
	node --require dotenv/config $(DIST_DIR)/index.js

####################################
# Generate RSS
####################################
.PHONY: generate_rss
generate_rss: ## RSS feed generator.
	node --require dotenv/config $(TOOLS_DIR)/rss/generateRSS.js

####################################
# Generate blog contents
####################################
.PHONY: generate_blog
generate_blog: ## Blog generator.
	$(MAKE) clean -j && \
	$(MAKE) build_script -j && \
	$(MAKE) build_style -j && \
	$(MAKE) copy -j && \
	$(MAKE) generate_rss -j

####################################
# Docker
####################################
# Building Docker image
.PHONY: build_docker_image
build_docker_image: ## Building Docker image.
	docker build --tag=$(DOCKER_HUB_USER)/$(DOCKER_IMAGE_TAG_PREFIX)$(DOCKER_IMAGE_BACKEND) ./docker/backend/ && \
	docker build --tag=$(DOCKER_HUB_USER)/$(DOCKER_IMAGE_TAG_PREFIX)$(DOCKER_IMAGE_REVERSE_PROXY) ./docker/reverse_proxy/

# Publish to DockerHub
.PHONY: push_docker_image
push_docker_image: ## Publish to DockerHub.
	docker push $(DOCKER_HUB_USER)/$(DOCKER_IMAGE_TAG_PREFIX)$(DOCKER_IMAGE_BACKEND) && \
	docker push $(DOCKER_HUB_USER)/$(DOCKER_IMAGE_TAG_PREFIX)$(DOCKER_IMAGE_REVERSE_PROXY)

# Served on Docker compose
.PHONY: docker_compose_up
docker_compose_up: ## Served on Docker compose.
	docker-compose up

# Served on Docker compose for WSL
.PHONY: docker_compose_up_wsl
docker_compose_up_wsl: ## Served on Docker compose for WSL.
	PWD=$(PWD_WIN) && \
	docker-compose up

# Run backend (use Docker compose) for WSL
.PHONY: docker_compose_run_backend_wsl
docker_compose_run_backend_wsl: ## Run backend (use Docker compose) for WSL.
	PWD=$(PWD_WIN) && \
	docker-compose run $(DOCKER_IMAGE_BACKEND) bash

# Run reverse proxy (use Docker compose) for WSL
.PHONY: docker_compose_run_reverse_proxy_wsl
docker_compose_run_reverse_proxy_wsl: ## Run reverse proxy (use Docker compose) for WSL.
	PWD=$(PWD_WIN) && \
	docker-compose run $(DOCKER_IMAGE_REVERSE_PROXY) bash

####################################
# Infrastructure
####################################
.PHONY: plan_infrastructure
plan_infrastructure: ## Planning infrastructure
	cd $(INFRASTRUCTURE_DIR); terraform plan; cd -

.PHONY: apply_infrastructure
apply_infrastructure: ## Applied infrastructure
	cd $(INFRASTRUCTURE_DIR); terraform apply; cd -
