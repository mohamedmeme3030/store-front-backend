# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Installation Instructions

This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

### Packages

Here are some of the few packages that were installed.

#### express

`npm i -S express`
`npm i -D @types/express`

#### typescript

`npm i -D typescript`

#### db-migrate

`npm install -g db-migrate`

#### g

`npm install -g n`

#### bcrypt

`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan

`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsonwebtoken

`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### jasmine

`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

## Set up Database

### Create Databases

We need to create database for develoment and other for test

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER store WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE store_dev;`
  - `CREATE DATABASE store_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c store_dev`
    - `GRANT ALL PRIVILEGES ON DATABASE store_dev TO store;`
  - Grant for test database
    - `\c shopping_test`
    - `GRANT ALL PRIVILEGES ON DATABASE store_test TO store;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database

`npx db-migrate up`

!['migrate database'](./docs/migrate_up.png)
!['migrate database'](./docs/migrate_up_tow.png)

## Enviromental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

**NB:** The given values are used in developement and testing but not in production.

```
PORT=3000
NODE_ENV=dev
POSTGRES_HOST=localhost

POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1997##**
BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=secret_key
```

## Start App

`npm run dev`

!['start server'](./docs/start_dev.png)

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

## Testing

Run test with

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database.

!['test 1'](docs/migrate_up_test.png)
!['test 2'](docs/migrate_up_tow_test.png)
!['test 3'](docs/run_jasmine.png)

## Important Notes

### Environment Variables

Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing.

### Changing Enviroment to testing

I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database.

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, we need to run command `export NODE_ENV=test && db-migrate up --env test && tsc && jasmine && db-migrate reset`

First we export NODE_ENV and set as test to get configuration of testing environment and run migration then compile typescript then run all test cases finally reset the migration
