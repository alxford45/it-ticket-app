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