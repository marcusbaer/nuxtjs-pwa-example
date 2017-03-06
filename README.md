# Example of using nuxt.js

This project is a playground for an application based on nuxt.js

## Setup

  $ yarn

## Run

  $ npm run dev

## Run with Docker

  $ docker-compose up -d
  $ docker-compose scale app=2
  $ docker-compose down -v

  $ # Get container ID
  $ docker ps

  $ # Print app output
  $ docker logs <container_id>

  $ # Enter the container
  $ docker exec -it <container_id> /bin/bash

  $ # get the ip of your docker machine
  $ docker-machine ip default

## Test

	$ npm test

## Integration tests

Setup tests:
```sh
cd nightwatch
yarn
```

Run the nightwatch tests:
```sh
docker-compose -f docker-compose.nightwatch.yml run --rm nightwatch
```

A video of the test will be stored in `test/videos`.  
Video recording is done with
[nightwatch-video-recorder](https://github.com/blueimp/nightwatch-video-recorder).

Connect to the chromedriver via VNC:
```sh
VNC_HOST="$(echo "${DOCKER_HOST:-localhost}" | sed 's#.*/##;s#:.*##')"
open vnc://user:secret@"$VNC_HOST":5900
```

The VNC password can be changed via `VNC_PASSWORD` environment variable for the
chromedriver container.

Stop and remove the docker-compose container set:
```sh
docker-compose down -v
```

Run with Saucelabs this way (at the moment):

- rename nightwatch.sauce.conf.js to nightwatch.conf.js
- create `.env` file with content:

  SAUCE_USERNAME=<saucelab_username>
  SAUCE_ACCESS_KEY=<saucelab_access_key>
  LAUNCH_URL=<launch_url>

## Build

  $ npm run build
  $ npm start

## Deploy with Now.sh

  $ npm run build
  $ now
  $ now -e PORT=3000 -e NODE_ENV=production
  $ now -e API_KEY=@acme-api-key -e APP_NAME="ZEIT, Inc"

  $ now secret add acme-api-key my-value-here
  $ now help secret

## Tools

- http://favicons.io/ to generate a favicon
- http://realfavicongenerator.net/ to generate a manifest.json
- https://manifest-validator.appspot.com/ for manifest validation
- https://zeit.co/blog/environment-variables-secrets

## Next things to try out

- sw-cache
- capture-card
- Firebase auth integration
- Walkie Talkie
- http://codepen.io/iamjoshellis/pen/yaAXmr/
