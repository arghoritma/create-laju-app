# create-laju-app

CLI tool to quickly create a new Laju project.

## Usage

```bash
# Create new project
npx create-laju-app my-app

# Navigate to project
cd my-app

# Start development server
npm run dev
```

## Options

```bash
npx create-laju-app <project-name> [options]
```

| Option | Description | Default |
|--------|-------------|---------|
| `--package-manager` | Package manager to use (npm, yarn, bun) | Auto-detect |

## What's Included

The created project includes:

- **Laju Framework** - High-performance TypeScript web framework
- **Svelte 5** - Reactive UI with runes
- **Inertia.js** - SPA without client-side routing
- **TailwindCSS 4** - Utility-first CSS with Vite
- **Database** - SQLite + Knex.js migrations
- **Authentication** - Session-based auth + OAuth (Google)
- **Storage** - S3/Wasabi support with presigned URLs
- **Email** - Nodemailer (SMTP) or Resend (API)
- **Caching** - Database cache or Redis

## Next Steps

After creating the project:

```bash
# Navigate to project
cd my-app

# Start development
npm run dev
```

Visit `http://localhost:5555` to view the application.

## Documentation

For complete Laju framework documentation, visit:

**[Laju Documentation →](https://github.com/maulanashalihin/laju)**

## License

MIT