# Banking System

A full-stack banking application built with Angular for the frontend and Spring Boot for the backend. The project includes user authentication, account management, deposits, withdrawals, transfers, transaction history, and an admin panel.

## Features

- User registration and login
- JWT-based authentication
- Account creation and account details view
- Deposit, withdrawal, and transfer operations
- Transaction history tracking
- Admin dashboard and account management

## Tech Stack

- Frontend: Angular 21, TypeScript, RxJS
- Backend: Spring Boot 3.3, Spring Security, Spring Data JPA
- Database: PostgreSQL
- Authentication: JWT

## Prerequisites

Before running the app, make sure you have the following installed:

- Java 21+
- Maven
- Node.js 20+
- npm 10+
- PostgreSQL 15+

## Database Setup

1. Create a PostgreSQL database named `banking_db`.
2. Run the SQL script in [database/schema.sql](database/schema.sql) to create the required tables.
3. Update the database credentials in [backend/src/main/resources/application.yml](backend/src/main/resources/application.yml) if needed.

## Backend Setup

```bash
cd backend
mvn spring-boot:run
```

The backend will run at:

- http://localhost:8080

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run at:

- http://localhost:4200

## Build Commands

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

- [backend](backend) - Spring Boot REST API
- [frontend](frontend) - Angular application
- [database](database) - SQL schema and database setup

## GitHub Push Instructions

If you want to publish this project on GitHub, run:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Notes

- The backend expects PostgreSQL to be running locally.
- If you change the database name or credentials, update the configuration file accordingly.
