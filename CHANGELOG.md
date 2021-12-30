# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/posthtml/posthtml-highlight/compare/v1.1.1...v3.0.0) (2021-12-30)

### ⚠ BREAKING CHANGES

- highlight.js language aliases have changed
  (https://github.com/highlightjs/highlight.js/blob/main/VERSION_11_UPGRADE.md)
- require Node >= 10
- Drop support for Node v8

### Bug Fixes

- types after update pkg ([100c667](https://github.com/posthtml/posthtml-highlight/commit/100c667f827d988d629454ef6b31325dc15c81b9))

### build

- drop support old node ([43461d4](https://github.com/posthtml/posthtml-highlight/commit/43461d4dea3aa6f38831a063af5395effc47506e))

- drop (explicit) support for Node v8 ([a093dc1](https://github.com/posthtml/posthtml-highlight/commit/a093dc13ee12450bccbb7ad7d4d5956282d825df))
- update highlight.js ([e879559](https://github.com/posthtml/posthtml-highlight/commit/e87955986239bbe1dec45b4abbe7b753f0d67d42))

## [2.0.0](https://github.com/posthtml/posthtml-highlight/compare/v1.1.1...v2.0.0) (2020-08-25)

### ⚠ BREAKING CHANGES

- require Node >= 10
- Drop support for Node v8

### Bug Fixes

- types after update pkg ([2a25676](https://github.com/posthtml/posthtml-highlight/commit/2a25676daa2700f67390cbfdeaed6a4e97ff27d3))

* drop (explicit) support for Node v8 ([a093dc1](https://github.com/posthtml/posthtml-highlight/commit/a093dc13ee12450bccbb7ad7d4d5956282d825df))

### build

- drop support old node ([92bcdac](https://github.com/posthtml/posthtml-highlight/commit/92bcdac0c5ed0a1379010963665167df093348fa))

### [1.1.1](https://github.com/posthtml/posthtml-highlight/compare/v1.1.0...v1.1.1) (2019-08-30)

## [1.1.0](https://github.com/posthtml/posthtml-highlight/compare/v1.0.3...v1.1.0) (2019-08-21)

### Features

- support nested tags ([a39a522](https://github.com/posthtml/posthtml-highlight/commit/a39a522))

## 1.0.3 (June 06, 2019)

- Chore: Upgrade highlight.js 9.12.0 => ^9.15.0

## 1.0.2 (Mar 28, 2018)

- Fixed: Add `hljs` class to container element
- Internal: Add npm lifecycle hooks to prevent oopsies

## 1.0.1 (Mar 27, 2018)

- Fixed: README
- Fixed: package.json => engines

## 1.0.0 (Mar 27, 2018)

- Added: Initial version
