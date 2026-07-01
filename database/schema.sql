-- ============================================================
--  Banking System - PostgreSQL Schema
--  Run this in pgAdmin4 after creating the database "banking_db"
-- ============================================================

-- ============ USERS ============
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,                       -- BCrypt hash
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    role        VARCHAR(20)  NOT NULL DEFAULT 'USER',        -- USER / ADMIN
    enabled     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============ ACCOUNTS ============
CREATE TABLE accounts (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    account_number  VARCHAR(20)  NOT NULL UNIQUE,            -- e.g. ACC-2026-000001
    type            VARCHAR(10)  NOT NULL,                   -- SAVINGS / CURRENT
    balance         DECIMAL(19,2) NOT NULL DEFAULT 0.00,
    status          VARCHAR(15)  NOT NULL DEFAULT 'ACTIVE',  -- ACTIVE / CLOSED / FROZEN
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT chk_balance_non_negative CHECK (balance >= 0),
    CONSTRAINT chk_account_type CHECK (type IN ('SAVINGS','CURRENT'))
);

-- ============ TRANSACTIONS ============
CREATE TABLE transactions (
    id               BIGSERIAL PRIMARY KEY,
    from_account_id  BIGINT,
    to_account_id    BIGINT,
    amount           DECIMAL(19,2) NOT NULL,
    type             VARCHAR(15) NOT NULL,                   -- DEPOSIT / WITHDRAWAL / TRANSFER
    description      VARCHAR(255),
    reference_number VARCHAR(30) NOT NULL UNIQUE,            -- TXN-<timestamp>-<rand>
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_txn_from FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    CONSTRAINT fk_txn_to   FOREIGN KEY (to_account_id)   REFERENCES accounts(id),
    CONSTRAINT chk_txn_amount_positive CHECK (amount > 0),
    CONSTRAINT chk_txn_type CHECK (type IN ('DEPOSIT','WITHDRAWAL','TRANSFER'))
);

CREATE INDEX idx_txn_from ON transactions(from_account_id);
CREATE INDEX idx_txn_to   ON transactions(to_account_id);
CREATE INDEX idx_txn_date ON transactions(created_at);

-- ============ SEED: Default Admin (password = admin123, BCrypt hashed) ============
-- NOTE: This hash is for "admin123" - we will regenerate properly in Step 4.
-- For now, create a placeholder; we'll insert the real admin via the app later.
INSERT INTO users (email, password, first_name, last_name, role)
VALUES ('admin@bank.com', '$2a$10$PLACEHOLDER_REPLACE_LATER', 'System', 'Admin', 'ADMIN');