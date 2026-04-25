CREATE DATABASE IF NOT EXISTS productsdb;
USE productsdb;

CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  email      VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  category    VARCHAR(50),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category) VALUES
  ('Laptop',     'Student laptop',          49999.00, 'Electronics'),
  ('Notebook',   'A5 ruled notebook',          99.00, 'Stationery'),
  ('Headphones', 'Wireless headphones',       1999.00, 'Electronics'),
  ('Backpack',   'Waterproof bag',             799.00, 'Accessories');
