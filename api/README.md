# Scripts

Make sure client is built at least once!

```
cd client
```

```
yarn run build

```

Once client is built

```
cd api
```

```
yarn start:dev
```

# Routes

### Base localhost/\*

Client site routing served statically.

<link href="http://localhost:5000">http://localhost:5000</link>

### API localhost/api/\*

API (cors only)

<link href="http://localhost:5000/api">http://localhost:5000/api</link>

Examples:

<pre>

(login)    GET/  http://localhost:5000/api/user

(register) POST/ http://localhost:5000/api/user

(update)   PUT/  http://localhost:5000/api/user
</pre>

### Swagger docs

View/test available REST endpoints using swagger UI

<link href="http://localhost:5000/docs">http://localhost:5000/docs</link>
