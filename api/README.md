# Scripts

## Development

Run client on separate terminal with proxy set to localhost:5000

Start server

```
yarn start
```

Start server in watch mode

```
yarn start:dev
```

## Production

Make sure client is built at least once!

```
cd client
```

```
yarn build

```

Once client is built

```
cd api
```

Build server

```
yarn build
```

start server

```
yarn start:prod
```

# Client Routes

## Development

client handles all routing on http://localhost:3000 using separate terminal

## Production

### Local

client handles all routing on http://localhost:5000 excluding routes on http://localhost:5000/api/

### Heroku

client handles all routing on https://lsu-it-support-demo.herokuapp.com excluding routes on https://lsu-it-support-demo.herokuapp.com/api/

# API Routes

## technician

```
POST /api​/tech
```

```
GET /api​/tech
```

```
GET /api​/tech​/{id}
```

```
PUT /api​/tech​/{id}
```

```
DELETE /api​/tech​/{id}
```

## ticket

```
POST /api​/ticket
```

```
GET /api​/ticket
```

```
GET /api​/ticket​/{id}
```

```
PUT /api​/ticket​/{id}
```

```
POST /api​/ticket​/work
```

```
GET /api​/ticket​/work
```

```
GET /api​/ticket​/work​/{id}
```

```
PUT /api​/ticket​/work​/{id}
```

```
DELETE /api​/ticket​/work​/{id}
```

```
POST /api​/ticket​/assign
```

```
GET /api​/ticket​/assign
```

```
GET /api​/ticket​/assign​/{id}
```

```
PUT /api​/ticket​/assign​/{id}
```

```
DELETE /api​/ticket​/assign​/{id}
```

## Customer

```
POST /api​/customer
```

```
GET /api​/customer
```

```
GET /api​/customer​/{id}
```
