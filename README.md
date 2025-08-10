# Landing Page

This project serves a static landing page using an Express server and includes tooling for testing and containerized deployment.

## Run locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

### Admin Login

Create a `.env` file based on `.env.example` and set the admin credentials. The admin
panel at `/admin` will redirect to `/login` until the correct username and password
are provided.

## Test

```bash
npm test
```

## Docker

Build and run the image:

```bash
docker build -t landingpage .
docker run -p 3000:3000 landingpage
```
