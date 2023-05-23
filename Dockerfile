FROM node:20-alpine3.16
LABEL authors="kaufmlu1"

# Create app directory
WORKDIR /usr/src/app

# Copy app dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port 5173
EXPOSE 5173

# Run app
CMD ["npm", "run", "dev"]
