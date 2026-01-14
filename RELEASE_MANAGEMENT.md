# Release Management Guide

This document provides a comprehensive overview of the modernized release management process for Log4js.

## Table of Contents

- [Overview](#overview)
- [Automated Release Process](#automated-release-process)
- [Conventional Commits](#conventional-commits)
- [Configuration Files](#configuration-files)
- [GitHub Actions Workflows](#github-actions-workflows)
- [Multi-Package Releases](#multi-package-releases)
- [Quick Reference](#quick-reference)

## Overview

Log4js v3.0+ uses **semantic-release** for fully automated version management, changelog generation, and package publishing. The system is based on **Conventional Commits** which allows the automation to determine the appropriate version bumps.

### Key Features

✅ **Automated Versioning** - No manual version bumping  
✅ **Changelog Generation** - Auto-generated from commit messages  
✅ **GitHub Releases** - Automatic creation with build artifacts  
✅ **npm Publishing** - Automated package publishing  
✅ **Commit Validation** - Enforce commit message standards with commitlint  
✅ **Multi-Package Support** - Independent versioning for log4js and log4js-server  

## Automated Release Process

### How It Works

1. **Developer commits** using conventional commit format
2. **Push to main/master** branch
3. **GitHub Actions** workflow triggers
4. **Tests run** (lint, typecheck, tests, build)
5. **semantic-release analyzes** commits since last release
6. **Version determined** based on commit types
7. **CHANGELOG updated** with new entries
8. **Git tag created** (e.g., `v3.1.0`)
9. **GitHub release** created with assets
10. **Package published** to npm
11. **Changes committed** back to repository

### Triggering a Release

Simply push conventional commits to the `main` or `master` branch:

```bash
git add .
git commit -m "feat: add new logging feature"
git push origin main
```

The automation handles the rest!

## Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types and Version Impacts

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat` | New feature | **MINOR** (1.x.0) |
| `fix` | Bug fix | **PATCH** (1.0.x) |
| `perf` | Performance improvement | **PATCH** (1.0.x) |
| `refactor` | Code refactoring | **PATCH** (1.0.x) |
| `docs` | Documentation only | **No release** |
| `test` | Tests only | **No release** |
| `chore` | Maintenance | **No release** |
| `ci` | CI/CD changes | **No release** |
| `style` | Code style | **No release** |
| `build` | Build system | **No release** |
| `revert` | Revert commit | **PATCH** (1.0.x) |

### Breaking Changes

For **MAJOR** version bump (x.0.0):

```bash
feat!: redesign API

BREAKING CHANGE: The Logger constructor now requires a configuration object
```

### Examples

```bash
# Feature (minor bump)
git commit -m "feat(logger): add async logging support"

# Bug fix (patch bump)
git commit -m "fix(appender): resolve file write race condition"

# Breaking change (major bump)
git commit -m "feat(core)!: remove deprecated methods

BREAKING CHANGE: Removed getLogger() method, use Log4js.getLogger() instead"

# Documentation (no release)
git commit -m "docs: update API examples"

# Skip release
git commit -m "chore(no-release): update dev dependencies"
```

## Configuration Files

### `.releaserc.json` (Root)

Basic semantic-release configuration for the monorepo:

```json
{
  "branches": ["main", "master"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git"
  ]
}
```

### `log4js/.releaserc.json`

Main package configuration with detailed plugin settings:

- Analyzes commits for version determination
- Generates release notes
- Updates CHANGELOG.md
- Publishes to npm
- Creates GitHub releases
- Commits changes back

### `log4js-server/.releaserc.json`

Server package configuration with separate tagging:

- Uses `server-v${version}` tag format
- Independent from main package versioning
- Separate GitHub release labels

### `.commitlintrc.json`

Commit message validation rules:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", ["feat", "fix", "docs", ...]],
    "header-max-length": [2, "always", 100]
  }
}
```

### `.husky/commit-msg`

Git hook that validates commits before they're accepted:

```bash
#!/usr/bin/env sh
npx --no -- commitlint --edit ${1}
```

## GitHub Actions Workflows

### `.github/workflows/release.yml`

Automated release workflow:

- **Triggers**: Push to main/master
- **Jobs**:
  1. Run full CI pipeline (lint, test, build)
  2. Execute semantic-release for log4js
  3. Execute semantic-release for log4js-server
- **Secrets Required**:
  - `NPM_TOKEN` - npm authentication
  - `GITHUB_TOKEN` - Automatic (provided by GitHub)

### `.github/workflows/ci.yml`

Continuous Integration:

- Runs on PRs and pushes
- Matrix testing (Node.js 18.x, 20.x, 22.x)
- Linting, type checking, testing, building
- Manual npm publishing on release events

### `.github/workflows/deploy-docs.yml`

Documentation deployment:

- Deploys VitePress docs to GitHub Pages
- Triggers on docs/ changes
- Only on main/master branch

## Multi-Package Releases

### Independent Versioning

**log4js** (main package):
- Tag format: `v3.0.0`
- Published as `log4js`
- Primary library

**log4js-server**:
- Tag format: `server-v1.0.0`
- Published as `@log4js/server`
- Express server for collecting browser logs

### Release Coordination

Both packages can be released:
- **Independently** - Based on their own commits
- **Simultaneously** - If commits affect both packages
- **Separately** - Different version numbers maintained

## Quick Reference

### Commit Message Cheatsheet

```bash
# Feature
git commit -m "feat(logger): add feature X"

# Bug fix
git commit -m "fix(appender): resolve bug Y"

# Breaking change
git commit -m "feat!: redesign API

BREAKING CHANGE: description of breaking change"

# Documentation
git commit -m "docs: update guide"

# No release
git commit -m "chore(no-release): update deps"
```

### Manual Release (Emergency)

If automation fails, manual release:

```bash
cd log4js
npm version [major|minor|patch]
npm run build
npm publish
git push --follow-tags
```

### Check Release Status

```bash
# View latest release
gh release view

# List all releases
gh release list

# View workflow runs
gh run list --workflow=release.yml
```

### Troubleshooting

**Release didn't trigger:**
- Check commit messages follow conventional format
- Verify push was to main/master branch
- Check GitHub Actions logs

**npm publish failed:**
- Verify `NPM_TOKEN` secret is set
- Check token has publish permissions
- Ensure package name isn't taken

**Commitlint rejection:**
- Review commit message format
- Ensure type is valid (feat, fix, etc.)
- Keep header under 100 characters
- Don't use uppercase for subject
- Remove trailing period

## Additional Resources

- [Full Release Guide](./docs/guide/releases.md)
- [Conventional Commits Spec](https://www.conventionalcommits.org/)
- [semantic-release Docs](https://semantic-release.gitbook.io/)
- [Semantic Versioning](https://semver.org/)

## Support

For release issues:
- Check [GitHub Actions](https://github.com/stritti/log4js/actions)
- Review semantic-release logs
- Open an [issue](https://github.com/stritti/log4js/issues)
