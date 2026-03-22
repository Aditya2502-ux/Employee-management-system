CREATE DATABASE IF NOT EXISTS ems_db;

USE ems_db;

CREATE TABLE IF NOT EXISTS employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    salary DOUBLE,
    dob VARCHAR(255),
    location VARCHAR(255),
    mobile_number VARCHAR(255)
);

-- Optional: Insert sample data
INSERT INTO employees (first_name, last_name, email_id, salary, dob, location, mobile_number) 
VALUES ('John', 'Doe', 'john.doe@example.com', 50000.0, '1990-01-01', 'New York', '1234567890');
INSERT INTO employees (first_name, last_name, email_id) VALUES ('Jane', 'Smith', 'jane.smith@example.com');
