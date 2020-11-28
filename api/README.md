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

Check https://lsu-it-support-demo.herokuapp.com/api/docs for schema DTO definitions

## Ticket

Create new user, ticket, and device

```
POST /api​/ticket
req: body: {createCombinedDTO}
res: body: {CombinedDTO}

```

Get all tickets with user/ticket/device info

```
GET /api​/ticket
req: none
res: body: {CombinedDTO[]}
```

Get all opened tickets with user/ticket/device info

```
GET /api​/ticket/opened
req: none
res: body: {CombinedDTO[]}
```

Get all closed tickets with user/ticket/device info

```
GET /api​/ticket/closed
req: none
res: body: {CombinedDTO[]}
```

Get one ticket by ticket_id with user/ticket/device info

```
GET /api​/ticket​/{ticket_id}
req: none
res: body: {CombineDTO}
```

Update ticket

```
/* NOT WORKING */
PUT /api​/ticket​/{id}
```

## User

Create new user

```
POST /api​/user
req: body: {CreateUserDTO}
res: body: {UserDTO}
```

Get all users

```
GET /api​/user
res: body: {UserDTO[]}
```

Get all users who are admins

```
GET /api​/user/admin
res: body: {UserDTO[]}
```

Get all users who are not admins

```
GET /api​/user/student
res: body: {UserDTO[]}
```

Get user by lsu_id

```
GET /api​/user/{lsu_id}
res: body: {UserDTO}
```

Update user

```
/* NOT WORKING */
PUT /api/user/{lsu_id}
```

## Assign

TODO

## Work

TODO
