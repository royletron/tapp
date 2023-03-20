A simple Go API with a React frontend.

## How to run

It's expected to run on at least `node 16` and `go 1.19`, from there you can install the deps:

```
go mod download
npm install
```

Once installed you can run the whole stack from `npm` with

```
npm run dev
```

This boots a Vite server, and the Go API with Vite running a proxy to the API. From there everything should be accessible on the displayed Vite port (typically http://127.0.0.1:5173/)

## How it works

### Go API

For this I used `Chi` which is a simple router, and put together an in-memory datastore - but tried to be mindful that this could easily be whipped out in future. All of the routes call functions on the 'model' and should error back if for any reason stuff doesn't work out. There are tests for the routes, but no unit tests for anything else.

### Frontend

For this I went with a fairly vanilla React project, with Tailwind for the styles, SWR for the API chatter and React-Router to do the browser routing. I implemented a set of hooks that use SWR to hit the relevant parts of the API, and the hooks that do anything to the data cache should mutate the cache directly (so no round trips to grab the same data).
