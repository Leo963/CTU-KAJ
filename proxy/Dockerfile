# base image
FROM node:19-alpine3.17

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files
COPY . .

# expose port 3000
EXPOSE 3000

# start server
CMD ["npm", "start"]