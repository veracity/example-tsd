# Client
This is the client side of your application. It is set up with a lot of useful features for building single-page applications in a quick and convenient manner:

- [React](https://reactjs.org/) - for responsive UI and component code structure
- [Redux](https://redux.js.org/) - for consistent state management
- [Parcel](https://parceljs.org/) - for efficient bundling and development
- [SCSS](https://sass-lang.com/) with [CSS Modules](https://github.com/css-modules/css-modules) - for powerful, reusable, independent stylesheets
- [React-Router](https://reacttraining.com/react-router/) - for client side routing
- Feature based folder structure to enforce atomic, independent components

## Development
Development is done using parcel developer mode. Simply run this command from a terminal to start it up

```
npm start
```

After a short while you should see a message telling you the build succeeded and a url you can open in a browser to view your application. The development server supports hot-reloading which means any time you save changes to a file that is part of your application it will be reloaded with your new code.

## Production
To build for production simply run

```
npm run build
```

A folder will be created under `dist` in the root of the project and your final client-side code will be bundled and provided there for deployment to a web-server.