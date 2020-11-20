# Description

Creates and seeds tables for database.

Uses pgtyped to generate typescript functions for calling sql queries.

Create new sql queries as follows:

1. create new sql file in src/sql
2. write using sql syntax with annotations:

   <em>src/sql/my_query.sql</em>

   ```
   /*
   @name queryName
   */
   SELECT * FROM table_name WHERE id = :id
   ```

Examples and documentation: https://pgtyped.now.sh/docs/

# Scripts

## Start

```
yarn start
```

Connects to heroku database and executes:

1. Drops tables: customer, technician, ticket
2. Creates tables: customer, technician, ticket
3. Seeds tables: customer, technician, ticket with values defined in src/seed.ts

## Init

```
yarn run init
```

Hacky script used to setup pgtyped. Not required to use any of the generated functions. Only required to generate new functions from newly added sql queries.

Connects to local database 'lsu_test' with user 'lsu_user' and executes:

1. Drops tables: customer, technician, ticket
2. Creates tables: customer, technician, ticket

Requirements: setup local postgres database

Creating local database (linux):

1. Install and start postgres
2. launch psql with root user (postgres)
3. create database:
   ```
   postgres=# create database lsu_test;
   postgres=# create user lsu_user with password 'password';
   postgres=# grant all privileges on lsu_test to lsu_user;
   postgres=# exit
   ```

Required to run one time before using typegen.

## Typegen

```
yarn run typegen
```

Requires init to be run one time before using.

Running 'yarn run codegen' requires additional setup.
