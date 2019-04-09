NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

SRC_DIR := $(CURDIR)/src
DIST_DIR := $(CURDIR)/dist
TOOLS_DIR := $(CURDIR)/tools
ASSETS_DIR := $(CURDIR)/assets

####################################
# Command definition
####################################
AVA := $(NPM_BIN_DIR)/ava
BABEL := $(NPM_BIN_DIR)/babel
CPX := $(NPM_BIN_DIR)/cpx
POSTCSS := $(NPM_BIN_DIR)/postcss
PRETTIER := $(NPM_BIN_DIR)/prettier
RIMRAF := $(NPM_BIN_DIR)/rimraf
TSC = $(NPM_BIN_DIR)/tsc
TSLINT := $(NPM_BIN_DIR)/tslint

ifeq ($(OS),Windows_NT)
	AVA = $(NPM_BIN_DIR)/ava.cmd
	BABEL = $(NPM_BIN_DIR)/babel.cmd
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

.PHONY: clean_for_test
clean_for_test:
	$(RIMRAF) \
	{$(SRC_DIR)/*.js,$(SRC_DIR)/**/*.js,$(SRC_DIR)/**/**/*.js} \
	{!$(SRC_DIR)/test_*.js,!$(SRC_DIR)/**/test_*.js,!$(SRC_DIR)/**/**/test_*.js}

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
build_nginx: PROXY_PASS ?= http://localhost:8080
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
	$(MAKE) clean_for_test && \
	$(MAKE) build_script_for_test && \
	$(AVA)

.PHONY: update_snapshots
update_snapshots: clean_for_test build_script_for_test
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
	$(MAKE) build -j && \
	$(MAKE) copy -j && \
	$(MAKE) generate_rss -j
