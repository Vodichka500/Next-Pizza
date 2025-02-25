
# Next-Pizza 🍕 / Full-stack Pizza Ordering Web Application

Next-Pizza is a modern and fully-featured pizza ordering platform. It allows users to browse a variety of pizzas and products, customize orders, and securely complete purchases. Built with **Next.js**, **Tailwind CSS**, and **Redux**, it offers smooth navigation, authentication, and seamless payment processing.

[![Project Status](https://img.shields.io/badge/status-completed-brightgreen.svg)](https://github.com/Vodichka500/next-pizza)

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://next-pizza-taupe-ten.vercel.app)




## Table of Contents
* [Live Demo](#live-demo)
* [Features](#features)
* [Featured Features](#featured-features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Screenshots](#screenshots)
* [License](#license)
## Live Demo

🚀 You can see and try my project using the link below.

🔗 Live Demo: [Next-Pizza Deployment](https://next-pizza-taupe-ten.vercel.app)

Test Account Credentials
Login: *u.kamisarau@gmail.com*  
Password: *password*

Or check the GIF demonstrating basic features and see [screenshots](#screenshots) at the end of the README.


![0225 (3)](https://github.com/user-attachments/assets/cf24a736-b560-49be-b63c-1ec6d860451b)


## Features

✔️ Browse a variety of pizzas and products 🍕  
✔️ Product Filtering and Sorting   
✔️ Add products to your cart 🛒  
✔️ Customize your order (size, toppings, etc.)  
✔️ Smooth navigation and state management with Redux  
✔️ Payment Integration via Crypto Cloud  
✔️ Secure Authentication (Google, GitHub, Email/Password)  
✔️ And much more...

## Featured Features
* Responsive Design

## Tech Stack


**Client:** Next.js, React, Redux, Tailwind CSS, ShadCN

**Server:** Node.js, Prisma, NextAuth.js

**Database:** PostgreSQL (via Prisma ORM)

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
POSTGRES_URL_NO_SSL=
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
*Ensure that all required environment variables are set before running the application.*

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

![image](https://github.com/user-attachments/assets/0f180c81-98f5-4039-be97-eafce0197fcd)
<br/>
![image](https://github.com/user-attachments/assets/5cc65586-b963-4ccc-b877-f99b9ca6aba7)  
![image](https://github.com/user-attachments/assets/4cc221da-47b0-46ff-b4c3-ba0ddbf40699)  
![image](https://github.com/user-attachments/assets/5046b7d2-2610-423f-91e3-8299dcaf0b49)  
![image](https://github.com/user-attachments/assets/95bb17bb-2748-4672-bc3d-f65588304761)  
![image](https://github.com/user-attachments/assets/a38f3d6d-af7f-470d-a362-61a115b86d05)  



## License
This project is open-source and available under the [MIT](https://choosealicense.com/licenses/mit/)
