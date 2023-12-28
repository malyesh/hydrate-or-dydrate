# Hydrate or Dydrate

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [Preview](#preview)

## Overview

A responsive application where users can track their hydration (or lack thereof) by updating their water and coffee intake levels by cup. Hydration is so important to a person's overall health, but coffee - a dehydrator - is often consumed like water. This web app displays a user's water and coffee intake so they can see the disparity between the two levels, and hopefully encourage more hydration!

## Technologies Used

#### Front-End
- HTML
- SCSS
- React
- ChartJS library
- Axios

#### Back-End
- Node
- Express.js
- MySQL
- Knex
- JWT
- bcrypt

## Features

1. **User Authentication:**
   Users can sign up and log in to personalized accounts where they have access to all their account information.

2. **Check Daily Intake Levels:**
   Users can go back and forth to view their water and coffee intake levels on a bar chart, day by day

3. **Update Coffee and Water Levels:**
   Users can click on either the coffee beans or water droplet to track each cup intake, respectively.

4. **Check Hydration Levels Over a Week Period:**
   Users can view their weekly intake levels on a line chart that displays both the water and coffee amounts for each day in the chosen week.

## Getting Started

Clone the repository

```bash
git clone https://github.com/malyesh/hydrate-or-dydrate.git
```

Install the client-side dependencies and start the React application

```bash
cd client
npm i
npm start
```

Install the server-side dependencies

```bash
cd server
npm i
npm start
```

Create .env file in the server folder to copy and populate the variables from the .env.sample file to create and connect to your database

```bash
CORS_ORIGIN=
PORT=
DB_HOST=
DB_NAME=
DB_USER=
DB_PASSWORD=

JWT_KEY=
```

Migrate tables into database

```bash
npx knex migrate:latest
```

Start the server

```bash
npm start
```

## Preview

Sign up page to create an account

![Screenshot 2023-12-28 122011](https://github.com/malyesh/hydrate-or-dydrate/assets/74512928/25866391-2372-44a2-b50a-47811f8824c7)


Login page to sign in

![Screenshot 2023-12-28 122025](https://github.com/malyesh/hydrate-or-dydrate/assets/74512928/1318f73f-4675-4d54-977f-91addb46a2d6)

View coffee and water levels, go back and forth to see previous days, and update by clicking on the coffee beans and water drops
![Screenshot 2023-12-28 122128](https://github.com/malyesh/hydrate-or-dydrate/assets/74512928/706c3254-d088-4f83-bf54-e7358ff81309)

View hydration levels over a week, go back and forth to check different weeks
![Screenshot 2023-12-28 124104](https://github.com/malyesh/hydrate-or-dydrate/assets/74512928/1f457b29-dfb3-4877-956e-63513f89ce66)
