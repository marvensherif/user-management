# Full Stack Application - Backend and Frontend

This repository contains two main parts:

- **Backend**: Built with .NET 8 and connected to a MySQL 8 database.
- **Frontend**: Built with Angular version 18.

## Prerequisites

Before you begin, ensure you have the following installed:

### Backend Prerequisites:

- **.NET SDK** (version 8.0 or higher)
- **MySQL** (version 8.0 or higher)
- **Visual Studio** or **Visual Studio Code** (for development)

### Frontend Prerequisites:

- **Node.js** (version 14.0 or higher)
- **Angular CLI** (version 18.0 or higher)
- **NPM** (comes with Node.js)

---

# Getting Started

### 1. Clone the Repository

- To clone the repository, run the following command:

- git clone https://github.com/yourusername/fullstack-project.git

- cd fullstack-project

### 2. Backend_setup

### Navigate to the backend folder:
- cd backend
- cd kemet_task
- dotnet restore

### Configure the MySQL database:
- Ensure MySQL 8 is installed and running.

### Open your MySQL client or command line, and create a new database for the project:
- CREATE DATABASE MyDatabase;
- Open the appsettings.json
- "ConnectionStrings": {
"DefaultConnection": "Server=localhost;MyDatabase=kemet_task_db;User=yourusername;Password=yourpassword;"
}

### Apply database migrations:
- dotnet ef database update

### Run the backend server:
- dotnet run
- The backend API will now be running on http://localhost:5000.

### 3. Frontend_Setup

### Navigate to the frontend folder:
- cd ../frontend

### Install Angular dependencies:
- npm install

### Start the Angular development server:
- ng serve
-The Angular application will now be running on http://localhost:4200.

### Running the Application
-Once both the backend and frontend are running, you can access the frontend in your browser at:
Frontend: http://localhost:4200
- The frontend will make API requests to the backend, which is running at: http://localhost:5000.










