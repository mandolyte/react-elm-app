# Adding an Elm Component to a React App

*Goal*: Add a simple Elm component to a standard React App

## Step 1. create the standard app using "cra"

This started with the standard method of starting a react app:
```
npx create-react-app react-elm-app
``` 

Added this `.gitignore`:
```
node_modules
elm-stuff
package-lock.json
```

## Step 2. update package.json

Add this line:
```json
    "react-elm-components": "^1.1.0"
```
Then rerun `npm install`

## Step 3. compile elm code JavaScript

For this example, I am using the `Time.elm` file, which comes from
[here](https://github.com/cultureamp/react-elm-components/tree/master/example-elm0.19).

- Copy the file into the `src` folder as `Main.elm` (to match the actual module name in the file)
- Run in project root foler: `elm init`, which creates a default `elm.json` file. 
- Update `elm.json` by runnnig: `elm install elm/time`:
```sh
$ elm install elm/time
I found it in your elm.json file, but in the "indirect" dependencies.
Should I move it into "direct" dependencies for more general use? [Y/n]: Y
Success!
$ 
```
- Compile `Main.elm` into JavaScript by `elm make src/Main.elm --output src/Main.js`
```sh
$ elm make src/Main.elm --output src/Main.js
Success! Compiled 1 module.

    Main ───> src/Main.js

$ 
```

At this point, the `src` folder will look like this:
```sh
$ ls src
App.css  App.test.js  index.js  Main.elm  reportWebVitals.js
App.js   index.css    logo.svg  Main.js   setupTests.js
$  
```

And the project root folder will two extra items:
- the `elm.json` file (Elm's equivalent to `package.json`)
- the `elm-stuff` folder (Elm's equivalent to `node_modules`)

## Step 3. add Elm code to App.js

This is the code before any changes are made:
```js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

- add the import needed
```js
import Elm from "react-elm-components";
import Clock from "./Clock";
```
- Replace the paragraph with:
```js
        <Elm src={Clock.main} />
```
**At this point, it compiles but does not work**


# FOLLOWING IS ORGINAL README CREATED
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
