# Landing Page

This project serves a static landing page using an Express server and includes tooling for testing and containerized deployment.

## Run locally

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

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
