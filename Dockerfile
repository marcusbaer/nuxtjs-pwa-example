# NodeJS 6.9.0 LTS
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle source
COPY . /usr/src/app
RUN npm run build

EXPOSE 5000
CMD [ "node", "server.js" ]
