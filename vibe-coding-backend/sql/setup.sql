-- ============================================================
-- VibeCoding Auth Table Setup
-- Run this script once to prepare the database for auth
-- ============================================================

-- Drop table if re-running setup
IF OBJECT_ID('dbo.AppUsers', 'U') IS NOT NULL
  DROP TABLE dbo.AppUsers;

CREATE TABLE dbo.AppUsers (
  id           INT IDENTITY(1,1) PRIMARY KEY,
  name         NVARCHAR(100)  NOT NULL,
  email        NVARCHAR(255)  NOT NULL UNIQUE,
  password_hash NVARCHAR(255) NOT NULL,
  created_at   DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);
