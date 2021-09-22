# Work Progression

This file shows a chronological progression of the development of the project. It lists what was done the previous day, what is intended to be done on if that day, and any impediments/struggles/bottlenecks that could hinder progress.

This **loosely** follows the structure of a Daily SCRUM Meeting.

## 9/11/21

- **What I did yesterday:**
  - N/A
- **What I plan on doing today:**
  - Work on the initial setup for frontend, backend, and documentation files.
- **Impediments:**
  - N/A

## 9/12/21

- **What I did yesterday:**
  - plan out the project and divide it into smaller tasks
  - create Github issues for each task
  - add initial documentation for application and development process
  - add create-react-app Typescript boilerplate
  - add package dependencies that will most likely be utilized for the project
- **What I plan on doing today:**
  - setup directory structure for frontend
  - add pages and components for frontend
  - configure Routing for <App />
- **Impediments:**

  - possible compatibility issue with ReduxForm and Typescript

## 9/13/21

- **What I did yesterday:**

  - add pages for frontend
  - configure routing for <App />
  - setup directory structure for frontend
  - finish most of the planning for the project

- **What I plan on doing today:**

  - finish the pages and components draft for frontend
  - add actions creators and reducers for react-redux
  - add simple styling for frontend
  - add redux forms for action creators

- **Impediments:**

  - type inference for ReduxForm in Typescript is very clunky and difficult to work with
  - react-testing-library and ReduxForm might not also work the best

## 9/15/21

- **What I did yesterday:**

  - finish backend draft using koa, MongoDB Atlas, and Typescript
    - koa backend setup (middleware and dependencies)
    - add both development and testing databases using MongoDB
    - error handling middleware
    - HTTP endpoint tests for both success and failure cases Toy functions
    - HTTP method routes for Toy document
    - Toy document model for mongoose
    - controller functions for Toy

- **What I plan on doing today:**

  - add AWS Cognito authentication for users
  - finish User document routes/controllers/models for backend
  - write tests for user document on backend

- **Impediments:**

  - weekly PT appointment
  - blackout

## 9/16/21

- **What I did yesterday:**

  - add Register, Login, and ValidateEmail pages
  - add AWS Cognito authentication for users

- **What I plan on doing today:**

  - finish User document routes/controllers/models for backend
  - write tests for user document on backend
  - add search and filter functionality
  - finish overall draft for both backend and frontend

- **Impediments:**

  - N/A

## 9/17/21

- **What I did yesterday:**

  - fix AWS Amplify issue when logging in
    - Auth.signIn always throwing NotAuthorizedException error Incorrect username or password
  - fix broken error notifications rendering when errors are returned by API and backend
  - finish drafts for User routes/controllers/models

- **What I plan on doing today:**

  - write tests for user document on backend
  - add search and filter functionality
  - dynamically change navbar links depending on whether user is logged in or not
  - finish overall draft for both backend and frontend

- **Impediments:**

  - Auth.signIn always throwing NotAuthorizedException error Incorrect username or password

## 9/18/21

- **What I did yesterday and today:**

  - fix bugs on User and Toy API
  - navbar renders the correct content based on user login status
  - UI update
  - add search and filter functionality (work in progress, still need to check for errors and write tests)
  - overall draft almost finished (just needs Wikipedia API, search and filter functions to work properly)

- **Impediments:**
  - N/A

## 9/20/21

- **What I did yesterday:**

  - N/A (off-day)

- **What I did today:**

  - fix bugs on filter and search
  - added Wikipedia API query for each toy page
  - users can no longer perform actions they're not allowed to
  - added an option for the user to upload their own image for their toy pages

- **Impediments:**
  - N/A

## 9/21/21

- **What I did today:**

  - fix security and permission bugs when creating, editing, and deleting toys
  - fix bug related to id property of toy when editing and deleting toys
  - fix bug with cloudinary api not detecting credentials when uploading images
  - added Wikipedia API query for each toy page
  - add nested sorting
  - make sort and filter case insensitive
  - add sample toys data for listing

- **Impediments:**
  - N/A

[<< Go back to README]()

[<< Go back to documentation links]()
