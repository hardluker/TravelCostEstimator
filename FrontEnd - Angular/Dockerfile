# Section 1: Generating the output production product

# Using the official node image as the base image
FROM node:18-alpine as build

# Setting the working directory
WORKDIR /app

# Add the source code to the app
COPY . .

# Installing the dependencies
RUN npm install

# Generating the build of the application
RUN npm run build

# Section 2: Copying from the build image to actually host the server

# Using an apache image
FROM httpd:alpine

# Copy the build output to the apache server's working directory
COPY --from=build /app/dist/travel-cost-estimator /usr/local/apache2/htdocs/

# Exposing port 80
EXPOSE 80
