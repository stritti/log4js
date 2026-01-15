# GitHub Actions Migration

The project has been migrated from Travis CI to GitHub Actions for continuous integration and deployment.

## What Changed

### Travis CI → GitHub Actions

**Before (.travis.yml):**
- Node.js 10.6.0
- Grunt-based builds
- Manual xvfb setup
- npm and GitHub releases deployment

**After (.github/workflows/ci.yml):**
- Node.js 18.x, 20.x, 22.x (matrix)
- Vite-based builds
- Modern GitHub Actions runners
- Automated npm and GitHub releases

## New Workflows

### 1. Build and Test (`build-and-test`)

Runs on every push and pull request to main/master/develop branches.

**Steps:**
1. Checkout code
2. Setup Node.js (matrix: 18.x, 20.x, 22.x)
3. Install dependencies
4. Run linter
5. Run type checking
6. Run tests
7. Build project
8. Upload artifacts (Node 20.x only)

### 2. Publish to npm (`publish-npm`)

Runs on release creation.

**Steps:**
1. Build the project
2. Publish to npm registry
3. Requires `NPM_TOKEN` secret

### 3. Publish Release Assets (`publish-release`)

Runs on release creation.

**Steps:**
1. Build the project
2. Create distribution archives (.tar.gz and .zip)
3. Upload to GitHub Releases

## Required Secrets

To enable automatic publishing, add these secrets in repository settings:

1. **NPM_TOKEN** - npm authentication token
   - Create at: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Type: Automation
   
2. **GITHUB_TOKEN** - Automatically provided by GitHub Actions

## Triggering Workflows

### Manual Trigger (Development)
```bash
git push origin your-branch
```

### Creating a Release
```bash
# Create and push a tag
git tag -a v3.0.0 -m "Release v3.0.0"
git push origin v3.0.0

# Or create release via GitHub UI
```

## Workflow File Location

`.github/workflows/ci.yml`

## Benefits of Migration

✅ **Faster builds** - Modern runners and caching
✅ **Matrix testing** - Test on multiple Node.js versions
✅ **Better integration** - Native GitHub integration
✅ **Modern tooling** - Support for latest Node.js versions
✅ **Free for open source** - Generous free tier
✅ **Better debugging** - Detailed logs and artifacts

## Migration Checklist

- [x] Create `.github/workflows/ci.yml`
- [x] Test workflows on feature branch
- [x] Add `NPM_TOKEN` secret
- [x] Update README badges
- [ ] Archive `.travis.yml` (optional)
- [ ] Update documentation

## Troubleshooting

### Build Fails on Node.js Version

The project requires Node.js >= 18.0.0. Older versions are not supported.

### npm Publish Fails

Ensure `NPM_TOKEN` is set correctly in repository secrets and has publish permissions.

### Tests Fail

Check that all dependencies are installed correctly and tests pass locally first.

## See Also

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Publishing Guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
