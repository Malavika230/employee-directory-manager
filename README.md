# Employee Directory Manager

A full-stack CRUD web application to manage employee records (ID, name, role, and location).

## Worked On

Project work date: **December 29, 2023**

## Features

- Add a new employee
- View all employees
- Update existing employee details
- Delete an employee record with confirmation
- Form validation on the frontend

## Tech Stack

- Frontend: React (Create React App), Axios, React Router, React Icons, Bootstrap
- Backend: Java 17, Spring Boot 3, Spring Web, Spring Data JPA
- Database: MySQL

## Repository Structure

```text
crud-application-for-employee-details/
	employeeFrontend/frontend/      # React frontend
	employeeBackend/backend/        # Spring Boot backend
	Mysql/DumpEmployeedb.sql        # SQL dump
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- Java 17
- Maven (or use the Maven wrapper provided)
- MySQL Server

## Database Setup

1. Create a MySQL database (for example: `employeedb2`).
2. Import the SQL dump from `Mysql/DumpEmployeedb.sql`.
3. Verify backend DB settings in `employeeBackend/backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employeedb2
spring.datasource.username=root
spring.datasource.password=your_password
```

Update username/password based on your local MySQL setup.

## Run the Backend (Spring Boot)

From `employeeBackend/backend`:

```bash
./mvnw spring-boot:run
```

On Windows:

```bat
mvnw.cmd spring-boot:run
```

Backend default URL: `http://localhost:8080`

## Run the Frontend (React)

From `employeeFrontend/frontend`:

```bash
npm install
npm start
```

Frontend default URL: `http://localhost:3000`

The frontend is configured with:

```json
"proxy": "http://localhost:8080/"
```

so API calls are forwarded to the backend during development.

## API Endpoints

- `POST /postemployees` - Create or update an employee
- `GET /getemployees` - Fetch all employees
- `DELETE /deleteemployees/{id}` - Delete employee by ID

## Notes

- Employee ID is manually provided and used as the primary key.
- CORS annotation is commented out in backend controller because frontend requests use the React proxy in development.

## Future Improvements

- Add pagination and search
- Add proper backend validation and exception handling
- Add integration and UI tests
- Containerize frontend and backend with Docker

## License

This project is for learning and portfolio use.