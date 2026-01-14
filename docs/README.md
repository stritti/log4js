# Log4js Documentation

This directory contains the VitePress-based documentation for Log4js.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deployment

Documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

The deployment is handled by the `.github/workflows/deploy-docs.yml` workflow.

## Structure

```
docs/
├── .vitepress/
│   └── config.ts       # VitePress configuration
├── guide/              # User guide
├── api/                # API reference
├── server/             # Server documentation
├── index.md            # Home page
└── package.json
```

## Contributing

To add or update documentation:

1. Edit the relevant `.md` files
2. Test locally with `npm run docs:dev`
3. Commit and push to trigger deployment

## License

Apache-2.0
