# Getting Started with Create Express.js App

## Available Scripts

Navigate into the `back-end` directory and you can run:

-   `npm install` - installs all the dependencies listed in the `package.json` configuration file.
    This is necessary before running the app, since the 3rd-party dependency code is excluded from version control by the `.gitignore` git settings file.

-   `npm start` - has been configured with `nodemon server` to starts up the server with a monitoring process that will stop and restart the server automatically anytime there is a code change.
    Once started, the server will by default be available on port `4000` of the local computer at the URL, `http://localhost:4000`.

-   `npm test` - Run Unit tests built with [mocha](https://mochajs.org/) and the [chai](https://www.chaijs.com/) assertion library (with the [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin to simplify testing back-end routes) are included for the back-end. Code coverage analysis is provided by the `nyc` module.

## Deploying back-end app as a container

The back-end can be started as a Docker container.

First, make sure Docker has been installed locally, and then run:

```bash
docker run -p 4000:4000 --restart unless-stopped -d --name backend backend
```

The containerized backend-end app should now be running as a background daemon on `http://localhost:4000`.
