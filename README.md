# Toy Gallery

## Overview

This application is an online toy gallery for users to showcase their action figures, figurines, plastic model kits, and so on.

It is a full-stack application built using Typescript, React, Node.js, Koa, SCSS, and etc.

## Table of Contents

- [Getting Started](https://github.com/Rammina/toy-gallery#getting-started)
  - [Prerequisites](https://github.com/Rammina/toy-gallery#prerequisites)
  - [Installation](https://github.com/Rammina/toy-gallery#installation)
    - [Frontend](https://github.com/Rammina/toy-gallery#frontend)
    - [Backend](https://github.com/Rammina/toy-gallery#backend)
    - [MongoDB and Cloudinary](https://github.com/Rammina/toy-gallery#mongodb-and-cloudinary)
      - [MongoDB Atlas Setup](https://github.com/Rammina/toy-gallery#mongodb-atlas-setup)
      - [Cloudinary Setup](https://github.com/Rammina/toy-gallery#cloudinary-setup)
- [Running Tests](https://github.com/Rammina/toy-gallery#running-tests)
- [Features](https://github.com/Rammina/toy-gallery#features)
  - [Authentication](https://github.com/Rammina/toy-gallery#authentication)
  - [Toys](https://github.com/Rammina/toy-gallery#toys)
  - [UI/UX](https://github.com/Rammina/toy-gallery#uiux)
  - [Testing](https://github.com/Rammina/toy-gallery#testing)
- [Built With](https://github.com/Rammina/toy-gallery#built-with)
- [Dependencies](https://github.com/Rammina/toy-gallery#dependencies)
- [License](https://github.com/Rammina/toy-gallery#license)

## Getting Started

Follow these instructions to run the project on your local machine for development and testing purposes.

### Prerequisites

To run this project and download its dependencies, `npm` and `Node.js` are required.

You can check if you have `npm` and its version by running:

```
npm -v
```

If you do not have npm, please download it along with Node.js from [Node.js website](https://nodejs.org/en/download/).

Follow the instructions for your specific operating system, and check for the version again to confirm that it is correctly installed.

### Installation

To begin, clone this project locally using:

```
git clone git@github.com:Rammina/toy-gallery.git
```

After cloning, go inside the project directory:

```
cd toy-gallery
```

#### Frontend

Follow these instructions to get the frontend up and running.

Go inside the frontend folder (assuming you are already in the project directory):

```
cd frontend
```

Install the dependencies with:

```
npm install
```

The frontend should now be running.

#### Backend

Follow these instructions to get the backend up and running.

Go inside the backend folder (assuming you are already in the project root directory):

```
cd backend
```

Install the dependencies with:

```
npm install
```

If you would like to install dev dependencies (required for Typescript type definition files and to run tests):

```
npm install --save-dev
```

To run the project locally, use the following command:

```
npm run dev
```

The backend requires the appropriate environment variables to run properly. Check `.env.example` for more details on which are required.

The backend should now be running.

#### MongoDB and Cloudinary

To run the server, one must make an account for both MongoDB Atlas and Cloudinary.

Registration instructions for both sites can be found in:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Cloudinary](https://cloudinary.com/users/register/free)

##### MongoDB Atlas Setup

After creating an account, click `New Project` and follow the instructions.

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599174/new-project_syllhh.png" alt="New Project"/>

After creating a project, click `Build a Cluster` and follow the instructions for free tier.

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599175/build-cluster_zjgjz4.png" alt="Build a Cluster"/>

After creating a cluster, go to `COLLECTIONS` and then choose `Add My Own Data` to create a new database for the server to use.

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599174/add-my-own-data_gwxwba.png" alt="Add My Own Data"/>

After creating a database, click `CONNECT`, follow the instructions, choose `Connect your application` as the connection method, and then retrieve the following information to put on the .env file:

- MONGO_URL

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599174/connect_auxyi2.png" alt="Connect"/>

##### Cloudinary Setup

To setup Cloudinary, one must first create an account. After registration, check the dashboard for the following information and put them on the .env file:

- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_NAME

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599174/cloudinary-api_hy3jku.png" alt="Cloudinary Dashboard"/>

## Running Tests

To run jest and supertest for the backend, start by installing dev dependencies by running:

```
npm install --save-dev
```

Go inside the backend folder (assuming you are already in the project directory):

```
cd backend
```

To run jest, run:

```
npm run test
```

You should be seeing a message that jest is running as well as test results and logs.

## Features

### Authentication

- register with email, username, and password
- validate email using AWS Cognito
- login with email or username, and password

### Toys

- display a list of toys on a page
- display a specific toy on a page
- sort and nested sort the list of toys on the page
- filter toys based on meta properties
- allow the user to:
  - create a toy page
  - update their own toy pages
  - delete their own toy pages
  - upload images of their toys inside a toy page
- store any created and updated toy data in a database
- query Wikipedia API for more information about a toy or franchise

### UI/UX

- Responsive design, works on mobile or when resized

### Testing

- RTL for frontend testing
- supertest for backend testing
- API endpoints tested for success and failure case

## Built With

- [TypeScript](https://www.typescriptlang.org/) - strongly-typed programming language with extensive tooling
- [React](https://reactjs.org/) - JavaScript library for building UIs
- [Node.js](https://nodejs.org/en/) - back-end JavaScript runtime environment
- [koa](https://koajs.com/) - lightweight Web framework for node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) - structuring and presenting Web content
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) - styling Web content
- [SASS](https://sass-lang.com/) - CSS preprocessor scripting

## Dependencies

- [Frontend Dependencies](/blob/rammina/dev/docs_md/frontend_dependencies.md)
- [Backend Dependencies](/blob/rammina/dev/docs_md/backend_dependencies.md)

//TODO: Update this and fix it

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md file](https://github.com/Rammina/toy-gallery/blob/main/LICENSE) for details.

[<< Go back to the top of the page](https://github.com/Rammina/toy-gallery#toy-gallery)
