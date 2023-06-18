# Question-Answer REST API Application

## Description

This is a backend application developed using Express JS and MongoDB. It includes functionality for managing Questions, Answers, and Users.

## Required Libraries

To run this application, you need to install the following libraries:

- `npm i express`: ExpressJS (required)
- `npm i express-async-handler`: Required for handling asynchronous operations in Express
- `npm i bcryptjs`: Required for password hashing
- `npm i jsonwebtoken`: Required for user authentication and access control
- `npm i multer`: Required for uploading avatars
- `npm i nodemailer`: Required for sending password reset emails to users
- `npm i slugify`: Required for generating slugs for each question
- `npm i -D nodemon`: Not necessary, but recommended for automatically refreshing the server on file changes during development
- `npm i dotenv`: Required for loading environment variables, including MongoDB login credentials and other configurations

## Getting Started

1. Install the above-mentioned libraries using the npm command.

2. Log in to MongoDB and create a project. Enter your project details in `config/env/config.env`.

3. I recommend using Postman to develop and test this project.

4. To start the project, run the command `npm run start` in the terminal.

5. You can quickly create dummy files for testing purposes. If you want to import dummy files, run `npm run import`. If you want to delete all data, run `npm run delete` in the terminal.
