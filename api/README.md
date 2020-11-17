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

## Base: localhost/\*

Client site routing served statically.

<a href="http://localhost:5000">http://localhost:5000</a>

## Api: localhost/api/\*

API (cors only)

<a href="http://localhost:5000/api">http://localhost:5000/api</a>

Examples:

<pre>

(login)    GET/  http://localhost:5000/api/user

(register) POST/ http://localhost:5000/api/user

(update)   PUT/  http://localhost:5000/api/user
</pre>

## Docs: localhost/docs

View/test available REST endpoints using swagger UI

<a href="http://localhost:5000/docs">http://localhost:5000/docs</a>
