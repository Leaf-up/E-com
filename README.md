# E-com

### About:

Welcome to our eCommerce application! This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

The application is developed by [Leaf up](https://github.com/Leaf-up) team.

### Technology stack:

<div align="center">

[![node](https://img.shields.io/badge/node-21-blue?logo=nodedotjs)](#)
[![vite](https://img.shields.io/badge/vite-5.2-blue?logo=vite)](#)
[![eslint](https://img.shields.io/badge/eslint-8.57-blue?logo=eslint)](#)
[![prettier](https://img.shields.io/badge/prettier-3.2.5-blue?logo=prettier)](#)
[![jest](https://img.shields.io/badge/jest-29.7-blue?logo=jest)](#)
[![react](https://img.shields.io/badge/react-18.2-blue?logo=react)](#)

</div>

- vite
- react
- mobx
- typescript

### Installation:

```
git clone -b develop --single-branch git@github.com:Leaf-up/E-com.git leaf-up-ecom
cd leaf-up-ecom
nvm install 21
npm install
cp .env.sample .env
```

### Commands:

| Command          | Description                 |
| ---------------- | --------------------------- |
| `npm run dev`    | Run dev server at 3000 port |
| `npm run build`  | Make a build                |
| `npm run lint`   | Linter checks               |
| `npm run format` | Prettier format             |
| `npm run test`   | Run tests                   |

### Project structure:

```markdown
.
├── src
│ ├── api # commercetools api
│ ├── pages # SPA pages
│ ├── ui # UI components
│ ├── utils # parcer, sanitize, throttle, etc.
│ ├── shared # Shared components
│ ├── widgets # Complex components
```
