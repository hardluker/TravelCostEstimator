# Real-time Travel Expense Estimator Tool

## Purpose of this project

The purpose of this project was to solve a specific business need at my place of employment. This tool is capable of fetching real-time hotel, car rental, and flight prices.
With this tool, productivity in estimating travel expenses is increased by up to 1500%. 

## Project Development

### Front End

The Front end was developed with Angular/Typescript. It utilizing HTTP requests to gather data from the Skyscanner API. It also gathers form data from a custom built REST API.

### Back End

The back end was developed with Django/Python. With this, it provides the user with full access to all major aiports in the US. Also, the user has access to over 287,000 cities for querying hotel costs.

### Deployment

This project is currently live [Here](https://travel-estimator.com). It was deployed on a Microsoft Azure Ubuntu instance. The applications were deployed in docker containers. With the help of NGINX and Certbot, the application has full SSL certifications automatically renewing every 60 days.
