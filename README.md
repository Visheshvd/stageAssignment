
  

# My List Feature

  

  

## Overview

  

  

This project implements the "My List" feature for an OTT platform, allowing users to save their favorite movies and TV shows to a personalized list. The backend services manage the user's list, including adding, removing, and listing saved items. This solution is designed to be scalable, performant, and includes integration tests.

  

  

## Setup

  

  

### Prerequisites

  

  

- Node.js and npm

  

- MongoDB

  

- Redis

  

  

### Installation

  

  

1. Clone the repository:

  

  

> git clone https://github.com/Visheshvd/stageAssignment.git

>

> cd stageAssignment

  

  

2. Install dependencies:

  

  

> npm install

  

  

3. Create a .env file in the root directory with the following content:

  

  

> MONGO_URI=mongodb://localhost:27017/stage

>

> PORT=5001

>

> REDIS_URL=redis://localhost:6379

  

  

4. Seed the database with initial data:

  

  

> npx ts-node data/users.ts

>

> npx ts-node data/movies.ts

>

> npx ts-node data/tvShows.ts

  

  

## Start the application:

  

  

> npm start

  

  

The server will be running on http://localhost:5001.

  

  

## To run the integration tests:

  

  

npm test

  

  

## Design Choices

  

### Backend

  

**TypeScript**: TypeScript is used for type safety and better code quality.

  

**Express.js**: Express.js is chosen for its lightweight and flexible web framework capabilities.

  

**MongoDB**: MongoDB is used for its scalability and ease of use.

  

**Redis**: Redis is used for caching to improve performance and reduce database load.

  

  

### Performance and Scalability

  

**Caching**: Implemented caching for user data and content details using Redis to reduce database read operations and improve response times.

  

**Pagination**: The listItems method implements pagination to handle large lists efficiently.

  

**Indexes**: Ensured proper indexing on frequently queried fields (e.g., user IDs).

  

  

### Code Structure

  

**Models**: Defined separate models for User, Movie, and TVShow to manage schema and validation.

  

**Services**: Implemented service methods to handle business logic, including caching and database interactions.

  

**Controllers**: Created controllers to handle API requests and responses.

  

**Routes**: Defined routes to map API endpoints to controller methods.

  

  

### Assumptions

  

**Authentication**: Assumes basic user authentication is in place; mock user IDs are used for testing.

  

**Content ID Prefix**: The contentId field is prefixed with movie_ or tvshow_ to distinguish between movies and TV shows.

  

**Initial Data**: Provided initial data scripts to set up the database locally for testing.


## API endpoints

cURL requests are given below for all the three api endpoints -

### Add

> curl --location 'localhost:5001/list/add' \
> 
> --header 'Content-Type: application/json' \
> 
> --data '{"userId": "1", "itemId": "6651afc72d249b9d0467c6ae", "itemType": "tvShow"}'

### List  

> curl --location 'localhost:5001/list/items?userId=1&page=1&limit=10'

### Remove

> curl --location 'http://localhost:5001/list/remove' \
> 
> --header 'Content-Type: application/json' \
> 
> --data '{"userId": "1", "itemId": "tvshow_6651afc72d249b9d0467c6ae"}'
