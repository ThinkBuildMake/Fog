# Project

The project is divided into a React Frontend and a Flask Backend. We are using NextJS for ease of deployment via Vercel.

## How to use

```
git clone <Name of Directory>
```

## Frontend

Install Node Version Manager (nvm), cd into the directory and type

```
nvm use
```

Inside the frontend directory, type

```
npm install
```

to install the dependencies and

```
npm run dev
```

to run the project

To change the environment to production/text, navigate to the next.config.js file

```js
module.exports = {
  // Webpack 5 is enabled by default
  webpack5: true,
  // Store Environment Variables : https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  env: {
    // Change Me
    // appEnv: 'PRODUCTION'
    appEnv: "DEVELOPMENT",
  },
};
```

## Backend

Open backend for a specific readme for the backend
