# Laju

⚡ **High-performance TypeScript web framework** - 11x faster than Express.js

Build modern full-stack applications with HyperExpress, Svelte 5, and Inertia.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-20--22-brightgreen)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/maulanashalihin/laju?style=social)](https://github.com/maulanashalihin/laju)

## 🚀 Quick Start

```bash
# Create new project
npx create-laju-app my-project
cd my-project

# Setup database
cp .env.example .env
npx knex migrate:latest

# Start development
npm run dev
```

Visit `http://localhost:5555`

## ✨ Features

### Performance First
- **258,611 req/sec** - HyperExpress server (11x faster than Express)
- **19.9x faster writes** - SQLite with WAL mode
- **Zero-config caching** - Database cache included (optional Redis)

### Modern Stack
- **Svelte 5** - Reactive UI with runes
- **Inertia.js** - SPA without client-side routing
- **TailwindCSS 4** - Utility-first CSS with Vite
- **TypeScript** - Full type safety

### Built-in Services
- **Authentication** - Sessions, OAuth (Google), password reset
- **Storage** - S3/Wasabi with presigned URLs
- **Email** - Nodemailer (SMTP) or Resend (API)
- **Caching** - Database cache or Redis
- **Templates** - Eta for SSR

## 📊 Performance

| Framework | Requests/sec | Comparison |
|-----------|--------------|------------|
| **Laju** | **258,611** | Baseline |
| Pure Node.js | 124,024 | 2x slower |
| Express.js | 22,590 | 11x slower |
| Laravel | 80 | 3,232x slower |

*Benchmark: Simple JSON response on same hardware*

## 📚 Documentation

**[Complete Documentation →](https://github.com/maulanashalihin/laju/tree/main/docs)**

Documentation is organized for progressive learning from beginner to advanced.

### Getting Started
- [Introduction](https://github.com/maulanashalihin/laju/blob/main/docs/01-INTRODUCTION.md) - Framework overview, quick start
- [Project Structure](https://github.com/maulanashalihin/laju/blob/main/docs/02-PROJECT-STRUCTURE.md) - Directory layout
- [Database](https://github.com/maulanashalihin/laju/blob/main/docs/03-DATABASE.md) - Knex.js + SQLite

### Core Features
- [Routing & Controllers](https://github.com/maulanashalihin/laju/blob/main/docs/04-ROUTING-CONTROLLERS.md) - Handle requests
- [Frontend (Svelte 5)](https://github.com/maulanashalihin/laju/blob/main/docs/05-FRONTEND-SVELTE.md) - Build reactive UI
- [Authentication](https://github.com/maulanashalihin/laju/blob/main/docs/06-AUTHENTICATION.md) - Sessions + OAuth
- [Middleware](https://github.com/maulanashalihin/laju/blob/main/docs/07-MIDDLEWARE.md) - Auth, rate limiting
- [Validation](https://github.com/maulanashalihin/laju/blob/main/docs/08-VALIDATION.md) - Input validation
- [Email](https://github.com/maulanashalihin/laju/blob/main/docs/09-EMAIL.md) - Send emails

### Advanced Features
- [Storage (S3)](https://github.com/maulanashalihin/laju/blob/main/docs/10-STORAGE.md) - File uploads
- [Caching](https://github.com/maulanashalihin/laju/blob/main/docs/11-CACHING.md) - Redis + Database cache
- [Background Jobs](https://github.com/maulanashalihin/laju/blob/main/docs/12-BACKGROUND-JOBS.md) - Cron jobs, Scheduling
- [CSRF Protection](https://github.com/maulanashalihin/laju/blob/main/docs/13-CSRF.md) - Security
- [Translation](https://github.com/maulanashalihin/laju/blob/main/docs/14-TRANSLATION.md) - Multi-language

### Production
- [Best Practices](https://github.com/maulanashalihin/laju/blob/main/docs/16-BEST-PRACTICES.md) - Code quality
- [Security Guide](https://github.com/maulanashalihin/laju/blob/main/docs/17-SECURITY.md) - Secure your app
- [Testing](https://github.com/maulanashalihin/laju/blob/main/docs/19-TESTING.md) - Unit + Integration tests
- [Deployment](https://github.com/maulanashalihin/laju/blob/main/docs/20-DEPLOYMENT.md) - Production setup

## Project Structure

```
app/
├── controllers/     # Request handlers
├── middlewares/     # Auth, rate limiting
├── services/        # DB, Mailer, Storage
└── validators/      # Input validation

resources/
├── js/
│   ├── Pages/       # Svelte/Inertia pages
│   ├── Components/  # Reusable components
│   └── index.css    # TailwindCSS 4
└── views/           # Eta templates

routes/              # Route definitions
migrations/          # Database migrations
```

## Commands

```bash
npm run dev                              # Development
npm run build                            # Production build
node laju make:controller UserController # Generate controller
npx knex migrate:make create_posts       # Create migration
npx knex migrate:latest                  # Run migrations
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Server | HyperExpress |
| Database | BetterSQLite3 + Knex |
| Frontend | Svelte 5 + Inertia.js |
| Styling | TailwindCSS 4 |
| Build | Vite |
| Templates | Eta |

## Author

**Maulana Shalihin** - [maulana@drip.id](mailto:maulana@drip.id)

- [tapsite.ai](https://tapsite.ai) - AI website builder
- [dripsender.id](https://dripsender.id) - Email marketing
- [laju.dev](https://laju.dev) - This framework

## Support

- Star this repository
- [Become a Sponsor](https://github.com/sponsors/maulanashalihin)
- Report bugs via [GitHub Issues](https://github.com/maulanashalihin/laju/issues)

## License

MIT License