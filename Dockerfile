# specify the node base image with your desired version node:<version>
FROM node:12
#install mysql
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt
# Create app directory
WORKDIR /usr/src/fede
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run client-install
# replace this with your application's default port
EXPOSE 5000
# run
CMD [ "node", "server/index.js" ]