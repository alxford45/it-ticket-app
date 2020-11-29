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

Updates one ticket by ticket_id; Does NOT update user or device

```
PUT /api​/ticket​/{ticket_id}
req: body: {UpdateTicketDTO}
res: body: {TicketDTO}
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

Update user by lsu_id

```
PUT /api/user/{lsu_id}
req: body: {UpdateUserDTO}
res: body: {UserDTO}
```

## Assignment

Get all assignments

```
GET /api/assignment
res: body: {AssignmentDTO}
```

Get all assignments assigned to admin by lsu_id

```
GET /api/assignment/user/{lsu_id}
res: body: {AssignmentDTO[]}
```

Get all assignments assigned to ticket by ticket_id

```
GET /api/assignment/ticket/{ticket_id}
res: body: {AssignmentDTO[]}
```

Get one assignment by assignment_id

```
GET /api/assignment/{assignment_id}
res: body: {AssignmentDTO}
```

Post new assignment

```
POST /api/assignment
req: body: {CreateAssignmentDTO}
res: body: {AssignmentDTO}
```

## Work

TODO
