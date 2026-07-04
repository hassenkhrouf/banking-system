# Banking System

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack banking application with user authentication, account management, deposits, withdrawals, transfers, and transaction history.

## Live Demo

- **Frontend**: [https://banking-system-weld.vercel.app](https://banking-system-weld.vercel.app)
- **Backend**: [https://banking-system-api-7aag.onrender.com](https://banking-system-api-7aag.onrender.com)

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌────────────┐
│  Vercel     │────▶│  Render      │────▶│  Render    │
│  (Angular)  │     │  (Spring     │     │  (Postgres)│
│  Client     │     │   Boot API)  │     │  16        │
└─────────────┘     └──────────────┘     └────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 21, TypeScript, RxJS, GSAP, AOS |
| **Backend** | Spring Boot 3.5, Spring Security, Spring Data JPA |
| **Database** | PostgreSQL 16 |
| **Auth** | JWT (access + refresh tokens) |
| **Deployment** | Vercel (frontend), Render (backend + DB) |

## Features

### User Features
- Register and login with JWT authentication
- Create bank accounts (checking, savings)
- Deposit and withdraw funds
- Transfer money between accounts
- View transaction history with filtering
- Real-time account balance updates

### Admin Features
- Admin dashboard with user overview
- Manage all user accounts
- View all transactions

### UI/UX
- Responsive glass-morphism design
- Loading states and animations
- Dark mode support
- Form validation with error messages
- Toast notifications

## Prerequisites

- Java 21+
- Maven 3.9+
- Node.js 20+
- npm 10+
- PostgreSQL 16+

## Local Setup

### 1. Database

```bash
docker compose up -d
```

Or create a local PostgreSQL database named `banking_db`.

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

Runs at `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Runs at `http://localhost:4200`.

## Environment Variables

Create `.env` in the project root (see `.env.example`):

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_URL` | `jdbc:postgresql://localhost:5432/banking_db` | Database URL |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `JWT_SECRET` | *(auto-generated)* | JWT signing secret |
| `JWT_EXPIRATION_MS` | `900000` | Access token expiry (15 min) |
| `JWT_REFRESH_EXPIRATION_MS` | `604800000` | Refresh token expiry (7 days) |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:4200` | Allowed CORS origins |

## Build

### Backend

```bash
cd backend
mvn -DskipTests package
```

### Frontend

```bash
cd frontend
npm run build
```

## Project Structure

```
banking-system/
├── backend/                 # Spring Boot REST API
│   ├── src/main/java/       # Java source
│   ├── src/main/resources/  # Config & SQL
│   └── Dockerfile           # Multi-stage Docker build
├── frontend/                # Angular application
│   ├── src/app/             # Components, services, models
│   └── vercel.json          # Vercel deployment config
├── database/                # SQL schema
├── docker-compose.yml       # Local PostgreSQL
├── vercel.json              # Vercel monorepo config
└── .env.example             # Environment variables template
```

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh JWT token |

### Accounts
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/accounts` | List user accounts |
| POST | `/api/accounts` | Create account |
| GET | `/api/accounts/{number}` | Account details |

### Transactions
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/transactions/deposit` | Deposit funds |
| POST | `/api/transactions/withdraw` | Withdraw funds |
| POST | `/api/transactions/transfer` | Transfer funds |
| GET | `/api/transactions/{number}` | Transaction history |

### Admin
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/users` | List all users |
| GET | `/api/admin/accounts` | List all accounts |
| GET | `/api/admin/transactions` | List all transactions |

## License

[MIT](LICENSE)
