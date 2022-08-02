# Home Library Service

> Let's try to create a Home Library Service! `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/zhenya-adamchyk/nodejs2022Q2-service
```

## Go to project root directory

```
cd nodejs2022Q2-service
```

## Installing NPM modules

```
npm install
```

## Running application

```
docker compose up
```

## Running prisma

```
npx prisma generate
```
```
npx prisma migrate dev
```

---

## Docker scan

For scan server

```
npm run docker:scan:main
```

For scan db

```
npm run docker:scan:postgres
```

---

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

## Used technologies:
- TypeScript
- docker
- nestjs
- swagger
- class-validator
- uuid
- dotenv
- jest
- eslint
- prettier
- node.js version: 16 LTS

---

## Authors:
*[Zhenya-Adamchyk](https://github.com/zhenya-adamchyk)*
