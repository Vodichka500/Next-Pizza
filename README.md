
# Next-Pizza 🍕 / Fullstack web-application

Next-Pizza is a modern and fully-featured pizza ordering platform. It allows users to browse a variety of pizzas and products, customize orders, and securely complete purchases. Built with **Next.js**, **Tailwind CSS**, and **Redux**, it offers smooth navigation, authentication, and seamless payment processing.

[![Project Status](https://img.shields.io/badge/status-completed-brightgreen.svg)](https://github.com/yourusername/next-pizza)

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://your-deployed-app-link.com)




## Table of Contents
* [Live Demo](#live-demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [License](#license)
## Live Demo

🚀 You can see and try my project using the link below.

🔗 Live Demo: [Next-Pizza Deployment](https://next-pizza-taupe-ten.vercel.app)

Account data of the test user:  
Login: *u.kamisarau@gmail.com*  
Password: *password*

Or check the GIF demonstrating basic features and see [screenshots](#screenshots) at the end of the README.


------------------------------Insert gif or link to demo ---------------------


## Features

✔️ Browse a variety of pizzas and products 🍕  
✔️ Product Filtering and Sorting   
✔️ Add products to your cart 🛒  
✔️ Customize your order (size, toppings, etc.)  
✔️ Smooth navigation and state management with Redux  
✔️ Payment Integration via Crypto Cloud  
✔️ Authentication in the Application (including authentication via Google and GitHub)  
✔️ And much more...
## Tech Stack


**Client:** Next.js, React, Redux, Tailwind CSS, ShadCN

**Server:** Node.js, Prisma, NextAuth.js

**Database:** PostgreSQL

**Deployment:** Vercel



## Installation

**Install my-project with npm**

```bash
git clone https://github.com/Vodichka500/Next-Pizza
cd next-pizza
npm install
```

**Set up the database**
* Create a PostgreSQL database (local or remote).
* Copy the database connection URL.

**Configure environment variables**
* Create a .env file in the project root
```bash
touch .env
```
* Get the necessary keys from the services (e.g., PostgreSQL, NextAuth, Vercel, CryptoCloud)
* Insert them into the .env

* .env example:
```
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=p
POSTGRES_PRISMA_URL=

DADATA_API_KEY=""
RESEND_API_KEY=""
CRYPTO_CLOUD_API_KEY=""

GITHUB_CLIENT_ID=""
GITHUB_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_SECRET=""

NEXT_AUTH_SECRET=""
```

**Apply database migrations**
```bash
prisma db push
prisma db seed
```

## Usage

Start the development server:
```bash
npm run dev
```
Build for production:
```bash
npm run build
npm start
```
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## License
This project is open-source and available under the
[MIT](https://choosealicense.com/licenses/mit/)
