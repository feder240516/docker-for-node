# specify the node base image with your desired version node:<version>
FROM node:12
# Create app directory
WORKDIR /usr/src/fede
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
# replace this with your application's default port
EXPOSE 5000
# run
CMD [ "node", "server/index.js" ]