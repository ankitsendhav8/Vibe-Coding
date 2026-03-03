-- ============================================================
-- VibeCoding MySQL Setup
-- Run once in your MySQL database (vibecodingdb)
-- ============================================================

CREATE DATABASE IF NOT EXISTS vibecodingdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE vibecodingdb;

-- General users table (CRUD demo)
CREATE TABLE IF NOT EXISTS Users (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Auth users table
CREATE TABLE IF NOT EXISTS AppUsers (
  id            INT          AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);
