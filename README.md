# Employee Creator Application


## Requirements / Purpose

-   The aim of this project is to create a Full Stack application to create and store employee information in a database.
- Front End tech stack:
    - Vite React
    - TypeScript
    - React Query (Tanstack)
    - React Redux
    - React Hook Forms
    - Axios

- Back End tech stack:
    - Springboot
    - Java
    - MySQL

---

## Design Goals / Approach

-   In terms of design I aim to go for something sleek and minimalist.
    - Must be easy/simple to use and intuitive.
    - Must also give user feedback for errors/success

---

## Features

-   This is still unfinished but so far the back end basics are done (Database and REST API functionality is there).
- Front end can GET and display all employees in the database and a form to POST employees has been implemented.

---

## Known issues

-   Permanent employees should have "finish date" input disabled when creating/editing
- Tests not fully implemented

---

## Future Goals

-   Testing for back end and front end still needs to be implemented
-   Front end still needs styling

---

## Change logs

### 27/09/2024 - Testing implemented
- Fixed issue with switching from active to archived employees

### 25/09/2024 - Testing implemented
- End to End testing started

### 24/09/2024 - Pagination implemented
- Search function for employees names has been implemented on the front end
- Query function to support the Search function has been implemented on the back end.

### 22/09/2024 - Pagination implemented
- Pagination has been implemented on the front end with pageable results on the backend 

### 20/09/2024 - Front End Tweaking

- Tweaked a bit of the styling for the Employee Info Pages
- Have also implemented a bit more sound logic to both the Employee Form validation on the front end as well as some additional business logic in the back end.
- Added a feature to Archive Employees instead of deleting them
- Added feature to only list current employees or archived employees depending on a button click

### 20/09/2024 - Styling Start

- Started Styling in the front end
- Have added a search bar
- Changed the rendering of the employees on the EmployeePage to be within a table rather than as cards
- Added individual employee profile pages



### 18/09/2024 - First Changelog

-   Have written the first changelog of the project 
- React Hook Form to enter employee details has been created 

---

