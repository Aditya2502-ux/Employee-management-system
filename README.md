# Employee Management System

A full-stack Employee Management System built with Spring Boot (Java), MySQL, and React.

## Project Structure
- `backend/`: Spring Boot REST API
- `frontend/`: React application using Vite and Axios

## Prerequisites
- Java 17 or higher
- MySQL Server
- Node.js and npm
- Maven (for backend)

## Getting Started

### 1. Database Setup
- Open your MySQL terminal or workbench.
- Run the script in `db_setup.sql` to create the database and table.
- Alternatively, you can create the database `ems_db` manually, and Spring Boot will create the tables automatically due to `spring.jpa.hibernate.ddl-auto=update`.

### 2. Backend Configuration
- Open `backend/src/main/resources/application.properties`.
- Update the `spring.datasource.username` and `spring.datasource.password` to match your MySQL credentials.

### 3. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:3000`.

## Features
- List Employees
- Add Employee
- Update Employee
- Delete Employee
