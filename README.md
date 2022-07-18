# Storefront Backend Project

## Getting Started

This Repo Backend Api for online store build by Nodejs,created RESTful API that can be used by onther developer.
You Can explore Database shape and schema here [REQUIREMENT.md](REQUIREMENTS.md)

## Lib

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

Instruction to install

#### Postgres

`npm i postgres`
`npm i -D @types/postgres`

#### express

`npm i express`
`npm i -D @types/express`

#### dotenv

`npm i dotenv`
`npm i -D @types/dotenv`

#### db-migrate

`npm i db-migrate`
`npm i db-migrate-pg`

#### jsonwebtoken

`npm i jsonwebtoken`
`npm i -D @types/jsonwebtoken`

#### jasmine

`npm i jasmine`
`npm i -D @types/jasmine`
`npm i jasmine-spec-reporter`

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API.

## User Endpoint

### A Create User route: 'api/users/create' [POST]

This endpoint take user object in request then create user

### A Index User route: 'api/users/index' [GET]

This endpoint get all availble users from DB

### A Get User route: 'api/users/get/:id' [GET]

This endpoint get specific user based on user id

## Product Endpoint

### Index Product route: 'api/product/index' [GET]

This endpoint get all availble users from DB

### A Get Product route: 'api/product/get/:id' [GET]

This endpoint get specific product based on id

### A Create Product route: 'api/product/create' [POST]

This endpoint take product object in request then create product

## Order Endpoint

### Current Order by user route: 'api/order/currentOrderByUserId/:id' [GET]

This endpoint get all order that related to user id

### 2. DB Creation and Migrations

#### Migrate up

we can submit our changes on db using migration
`npx db-migrate up`

#### Migrate down

we can back up to our chages by migrate down
`npx db-migrate down`

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled.

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database.

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
