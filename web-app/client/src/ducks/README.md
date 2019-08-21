# Ducks
[The **duck** pattern](https://github.com/erikras/ducks-modular-redux) is a method for organizing actions, reducers and action creators into a single file. The pattern helps with logically grouping related code and along with the `redux-actions` module simplifies building complex business logic with actions and reducers.

Read more here: [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)

## This folder
This folder only contains the root reducer that combines all other "ducks" together. This is needed for redux to pick up on our reducers. You should modify the `index.js` file in this folder whenever you add new ducks to the system.

## Creating new ducks
Usually ducks are created as part of features and should exist in a subfolder of the `features` folder. For some rare cases it might be more useful to put ducks in this folder directly. Such ducks should be generic and have no external dependencies to other features.