NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

SRC_DIR := $(CURDIR)/src
DIST_DIR := $(CURDIR)/dist
ASSETS_DIR := $(SRC_DIR)/Assets

####################################
# Command definition
####################################
AVA := $(NPM_BIN_DIR)/ava
POSTCSS := $(NPM_BIN_DIR)/postcss
PRETTIER := $(NPM_BIN_DIR)/prettier
RIMRAF := $(NPM_BIN_DIR)/rimraf
TSC = $(NPM_BIN_DIR)/tsc
TSLINT := $(NPM_BIN_DIR)/tslint

ifeq ($(OS),Windows_NT)
	AVA = $(NPM_BIN_DIR)/ava.cmd
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
# Test
####################################
.PHONY: test
test: ## Execute test cases.
	$(AVA)

.PHONY: update_snapshots
update_snapshots:
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
# Build
####################################
.PHONY: build
build: clean build_script build_style ## Building scripts and stylesheets.

.PHONY: build_script
build_script:
	$(TSC)

.PHONY: build_style
build_style:
	$(POSTCSS) $(ASSETS_DIR)/index.pcss --config $(CURDIR)/postcss.config.js --output $(DIST_DIR)/assets/styles/index.css
