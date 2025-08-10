install:
	npm install

start:
	npm start

test:
	npm test

docker-build:
	docker build -t landingpage .

docker-run:
	docker run -p 3000:3000 landingpage
