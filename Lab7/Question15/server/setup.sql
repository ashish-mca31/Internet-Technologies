CREATE DATABASE IF NOT EXISTS crud_app;

USE crud_app;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(100)  NOT NULL UNIQUE,
  age        INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: insert some sample data
INSERT INTO users (name, email, age) VALUES
  ('Ashish Sharma', 'Ashish@example.com', 22),
  ('Ragini Arora',     'Ragini@example.com',   20),
  ('Suhail Ansari',   'Suhail@example.com', 25);
