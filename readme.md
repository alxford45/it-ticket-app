# General

ABSTRACT LINK:
https://docs.google.com/document/d/17FaeX0DGgWHz5hcuJDZ2wqT9qw_v5LO15wX-Akj1jdM/edit?usp=sharing

OUTLINE CHECKLIST:
https://docs.google.com/document/d/1N_WtNBUiUPX-EU3sAUixegipE55KJ8FSjHKYyVpp4v4/edit?usp=sharing

PRESENTATION:
https://docs.google.com/presentation/d/1WmKdWIpRIxtzcTTVjqoQRV2DA9bop9dLcbi-z9HetiU/edit?usp=sharing

WRITTEN REPORT:
https://1drv.ms/w/s!AjYdG4Fmx1E7lyOXwYqLYMnSmTbJ?e=COQNje

Please note that these credentials are not permanent.

Heroku rotates credentials periodically and updates applications where this database is attached.

Host
ec2-54-158-190-214.compute-1.amazonaws.com

Database
d3t7i9dt3u6h4g

User
brvuirrqqcjzsb

Port
5432

Password
37f36b1e7cb6167c12f84c9e356c14535824e0a6c7e0dfe5fb71417f2be8d5b8

URI
postgres://brvuirrqqcjzsb:37f36b1e7cb6167c12f84c9e356c14535824e0a6c7e0dfe5fb71417f2be8d5b8@ec2-54-158-190-214.compute-1.amazonaws.com:5432/d3t7i9dt3u6h4g

Heroku CLI
heroku pg:psql postgresql-octagonal-80370 --app lsu-it-support-demo

# SQL

schema.sql will serve as reference source for both api and client. Make changes here first to eliminate confusion on how request/response should be structured.

TODO:

- finalize base table names and structure
- finalize field names and corresponding postgres types
- define relations
- define relation tables

# Scripts

## Production

Heroku scripts used automatically for deployment:

- yarn start
- yarn build
- yarn build:client
- yarn build:api

## Development

```
yarn run dev
```

```
npm run dev
```

Runs client @ http://localhost:3000 and sever @ http://localhost:5000 concurrently from root directory.
