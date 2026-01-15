# Release Management

Log4js uses modern, automated release management powered by **semantic-release** and **Conventional Commits**. This ensures consistent versioning, automated changelog generation, and streamlined releases.

## Overview

The release process is **fully automated** using GitHub Actions. When commits are pushed to the `main` or `master` branch, semantic-release analyzes the commit messages and automatically:

1. Determines the next version number
2. Generates/updates the CHANGELOG
3. Creates a Git tag
4. Creates a GitHub release with assets
5. Publishes to npm

## Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This enables automated versioning and changelog generation.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types and Version Bumps

| Type | Description | Version Bump | Example |
|------|-------------|--------------|---------|
| `feat` | New feature | **Minor** (1.x.0) | `feat: add file appender` |
| `fix` | Bug fix | **Patch** (1.0.x) | `fix: resolve memory leak` |
| `perf` | Performance improvement | **Patch** (1.0.x) | `perf: optimize logger caching` |
| `refactor` | Code refactoring | **Patch** (1.0.x) | `refactor: simplify level logic` |
| `docs` | Documentation only | **No release** | `docs: update API reference` |
| `test` | Tests only | **No release** | `test: add logger tests` |
| `chore` | Maintenance tasks | **No release** | `chore: update dependencies` |
| `ci` | CI/CD changes | **No release** | `ci: update workflow` |
| `style` | Code style changes | **No release** | `style: format code` |
| `build` | Build system changes | **No release** | `build: update vite config` |
| `revert` | Revert a previous commit | **Patch** (1.0.x) | `revert: undo feature X` |

### Breaking Changes

To trigger a **major** version bump (x.0.0), include `BREAKING CHANGE:` in the commit footer or use `!` after the type:

```bash
feat!: redesign API interface

BREAKING CHANGE: Logger constructor now requires configuration object
```

### Commit Examples

```bash
# Feature (minor version bump)
feat(logger): add async logging support

# Bug fix (patch version bump)
fix(appender): resolve file write race condition

# Performance improvement (patch version bump)
perf(core): optimize event formatting by 50%

# Breaking change (major version bump)
feat(logger)!: remove deprecated getLogger method

BREAKING CHANGE: getLogger() has been replaced with Log4js.getLogger()

# Documentation (no release)
docs(guide): add TypeScript examples

# Scope with no-release to skip versioning
chore(no-release): update dev dependencies
```

### Available Scopes

- `core` - Core library changes
- `logger` - Logger-specific changes
- `appender` - Appender changes
- `layout` - Layout system changes
- `level` - Log level changes
- `server` - Server package changes
- `docs` - Documentation changes
- `deps` - Dependency updates
- `config` - Configuration changes
- `release` - Release-related changes
- `no-release` - Explicitly skip release

## Automated Release Workflow

### Release Branches

Log4js supports two release workflows:

| Branch | Release Type | Version Format | npm Tag | Description |
|--------|--------------|----------------|---------|-------------|
| `main`/`master` | **Production** | `3.1.0` | `latest` | Stable releases for production use |
| `develop` | **Pre-release** | `3.1.0-beta.1` | `beta` | Beta releases for testing new features |

### Production Releases (main/master)

1. **Developer pushes commits** to `main`/`master` branch
2. **GitHub Actions triggers** the release workflow
3. **Tests run** (lint, typecheck, tests, build)
4. **semantic-release analyzes** commit messages since last release
5. **Version determined** based on commit types
6. **CHANGELOG generated** from commit messages
7. **Version bumped** in package.json (e.g., `3.1.0`)
8. **Git tag created** (e.g., `v3.1.0`)
9. **GitHub release created** with build artifacts
10. **Package published** to npm with `latest` tag
11. **Commit pushed** back to repository with changelog

### Pre-releases (develop)

When commits are merged to the `develop` branch:

1. **semantic-release creates a beta pre-release**
2. **Version format**: `3.1.0-beta.1`, `3.1.0-beta.2`, etc.
3. **Git tag created**: `v3.1.0-beta.1`
4. **GitHub release** marked as **pre-release**
5. **Published to npm** with `beta` tag

**Installing beta versions:**
```bash
npm install log4js@beta
npm install @log4js/server@beta
```

**Workflow:**
```bash
# Develop and test features on develop branch
git checkout develop
git commit -m "feat: add new feature"
git push origin develop
# → Triggers automatic beta release (e.g., 3.1.0-beta.1)

# When stable, merge to main for production release
git checkout main
git merge develop
git push origin main
# → Triggers production release (e.g., 3.1.0)
```

### Multi-Package Releases

Log4js supports releasing multiple packages:

- **log4js** (main package): Tagged as `v3.0.0` (or `v3.0.0-beta.1`)
- **log4js-server**: Tagged as `server-v1.0.0` (or `server-v1.0.0-beta.1`)

Each package has its own `.releaserc.json` configuration and releases independently based on commit messages.

## Manual Release Process (Alternative)

If you need to create a release manually:

### 1. Update Version

```bash
cd log4js
npm version [major|minor|patch]
```

### 2. Update Changelog

Manually update `CHANGELOG.md` with release notes.

### 3. Create Git Tag

```bash
git tag -a v3.0.0 -m "Release v3.0.0"
git push origin v3.0.0
```

### 4. Create GitHub Release

Go to GitHub → Releases → Create a new release, select the tag, and upload build artifacts.

### 5. Publish to npm

```bash
npm publish
```

## Changelog

The `CHANGELOG.md` file is automatically generated from commit messages. It includes:

- **Features**: New functionality (`feat:`)
- **Bug Fixes**: Bug fixes (`fix:`)
- **Performance Improvements**: Performance enhancements (`perf:`)
- **Reverts**: Reverted changes (`revert:`)
- **Code Refactoring**: Refactoring changes (`refactor:`)
- **Documentation**: Documentation updates (`docs:`) - if configured

### Changelog Format

```markdown
# Changelog

## [3.1.0](https://github.com/stritti/log4js/compare/v3.0.0...v3.1.0) (2024-01-14)

### Features

* **logger**: add async logging support ([abc123](commit-link))
* **appender**: add file rotation ([def456](commit-link))

### Bug Fixes

* **core**: resolve memory leak in event queue ([ghi789](commit-link))
```

## Version Numbering

Log4js follows [Semantic Versioning (SemVer)](https://semver.org/):

**MAJOR.MINOR.PATCH** (e.g., `3.1.2`)

- **MAJOR** (3): Breaking changes, incompatible API changes
- **MINOR** (1): New features, backward-compatible
- **PATCH** (2): Bug fixes, backward-compatible

## Pre-releases

Pre-releases are automatically created when commits are merged to the `develop` branch.

### Automatic Beta Releases

```bash
# Work on develop branch
git checkout develop
git commit -m "feat: add experimental feature"
git push origin develop

# Automatically creates: 3.1.0-beta.1
```

### Version Progression

```
develop branch commits:
3.1.0-beta.1 → 3.1.0-beta.2 → 3.1.0-beta.3

Merge to main:
3.1.0 (stable release)
```

### Installing Pre-releases

```bash
# Install latest beta version
npm install log4js@beta

# Install specific beta version
npm install log4js@3.1.0-beta.2
```

### Manual Pre-release (if needed)

For manual pre-release creation:

```bash
# Create a pre-release
npm version prerelease --preid=beta

# Results in: 3.1.0-beta.0
```

Pre-releases can be published with:

```bash
npm publish --tag beta
```

## CI/CD Integration

### GitHub Actions Workflows

**`.github/workflows/release.yml`** - Automated release
- Triggers on push to main/master
- Runs tests and builds
- Executes semantic-release
- Publishes to npm
- Creates GitHub releases

**`.github/workflows/ci.yml`** - Continuous Integration
- Runs on PRs and pushes
- Matrix testing (Node 18.x, 20.x, 22.x)
- Lint, typecheck, test, build

**`.github/workflows/deploy-docs.yml`** - Documentation
- Deploys VitePress docs to GitHub Pages
- Triggers on docs/ changes

### Required Secrets

Configure these secrets in GitHub Settings → Secrets:

- `NPM_TOKEN` - npm authentication token for publishing
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

## Commit Message Validation

Commits are validated using **commitlint** to ensure they follow the Conventional Commits specification.

### Local Setup

Install commitlint and husky:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
npx husky install
```

Add commit-msg hook:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

Now all commits will be validated before they're accepted.

### Configuration

Commitlint is configured in `.commitlintrc.json`:

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", ["feat", "fix", "docs", ...]],
    "header-max-length": [2, "always", 100]
  }
}
```

## Best Practices

### DO ✅

- Use conventional commit messages consistently
- Keep commit subjects under 100 characters
- Include scope when relevant: `feat(logger): ...`
- Use imperative mood: "add feature" not "added feature"
- Reference issues: `fix(#123): resolve bug`
- Group related changes in one commit
- Test before pushing to main/master

### DON'T ❌

- Push directly to main/master without CI passing
- Use vague commit messages: "update code"
- Mix multiple changes in one commit
- Skip commit message validation
- Manually edit CHANGELOG.md (it's auto-generated)
- Create tags manually (semantic-release handles it)

## Troubleshooting

### Release didn't trigger

**Check:**
1. Are commits on main/master branch?
2. Do commit messages follow Conventional Commits?
3. Is there a version bump trigger? (feat, fix, perf, etc.)
4. Check GitHub Actions logs

### npm publish failed

**Check:**
1. Is `NPM_TOKEN` secret configured?
2. Is the token valid and has publish permissions?
3. Does package name already exist on npm?
4. Check npm registry status

### Version already published

semantic-release will skip if version already exists. Check:
1. npm registry for existing version
2. Git tags for existing release tags
3. GitHub releases

### Commit rejected by commitlint

**Fix:**
1. Review commit message format
2. Ensure type is valid (feat, fix, etc.)
3. Check subject case (should not start with uppercase)
4. Remove trailing period from subject
5. Keep header under 100 characters

## Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)
- [commitlint Documentation](https://commitlint.js.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For release issues or questions:
- Open an issue on [GitHub](https://github.com/stritti/log4js/issues)
- Check existing release workflow runs
- Review semantic-release logs in GitHub Actions
