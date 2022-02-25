# Adding an Elm Component to a React App

*Goal*: Add a simple Elm component to a standard React App
*Method*: using https://github.com/Parasrah/elm-react-component; see
the "example" folder.

## Step 0. remove all non-CRA stuff

This is stuff from previous attempt...
- rm -rf archive/ elm-stuff/ node_modules/ package-lock.json
- rm src/Main*
- rm elm.json
- remove edits to App.js

Let's use yarn this time...

*Ensure that the standard CRA is now working*
```
yarn # to install everything
yarn start # to run
```
Looks good.



## Step 1. create the standard app using "cra"

This started with the standard method of starting a react app:
(Can skip this if done already)
```
npx create-react-app react-elm-app
``` 

Added this `.gitignore`: (some changes)
```
node_modules
elm-stuff
yarn.lock
```

## Step 2. update package.json

Add the elm things:
```
yarn add -D @rescripts/cli @elm-react/rescripts-elm elm elm-webpack-loader
```

Do the edits to package.json scripts, where react-scripts is changed to rescripts, etc.
```
  "scripts": {
-   "start": "react-scripts start",
+   "start": "rescripts start",
-   "build": "react-scripts build",
+   "build": "rescripts build",
-   "test": "react-scripts test",
+   "test": "rescripts test",
-   "eject": "react-scripts eject"
  },
  .
  .
  .
+ "rescripts": [
+   "@elm-react/rescripts-elm"
+ ]
```

Next install:
```
yarn add @elm-react/component
```

## Step 3. add the elm code

For this example, I am using the `Time.elm` file, which comes from
[here](https://github.com/cultureamp/react-elm-components/tree/master/example-elm0.19).

- Copy the file into the `src` folder:
```
cp ../react-elm-components/example-elm0.19/Time.elm src/
```

Create a JSX for it:
```js
// Time.jsx
import wrap from '@elm-react/component'
import Time from './Time.elm'
export default wrap(Time)
```

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
import Time from './Time'
```
- After the paragraph add:
```js
        <Time />
```

Stop yarn start if running, then run yarn and yarn start.

Get this error:
```

ERROR in ./src/Time.elm
Module build failed (from ./node_modules/elm-webpack-loader/index.js):
Compiler process exited with error Compilation failed
 @ ./src/Time.jsx 5:0-30 6:25-29
 @ ./src/App.js 6:0-26
 @ ./src/index.js 7:0-24 11:33-36
```

I run elm reactor and navigate to the Time.elm. It complains 
that I need to run elm init. So in the root of the package:
```
elm init
```
Then running elm reactor, I get this error:
```
-- MODULE NAME MISMATCH  /home/mando/Projects/github.com/mandolyte/react-elm-app/src/Time.elm

It looks like this module name is out of sync:

1| module Main exposing (Model, Msg(..), init, main, subscriptions, timeToString, update, view)
          ^^^^
I need it to match the file path, so I was expecting to see `Time` here. Make
the following change, and you should be all set!

    Main -> Time

Note: I require that module names correspond to file paths. This makes it much
easier to explore unfamiliar codebases! So if you want to keep the current
module name, try renaming the file instead.
```

On page refresh for elm reactor, I now get this error:
```
-- IMPORT CYCLE ----------------------------------------------------------------

Your module imports form a cycle:

    ┌─────┐
    │    Time
    └─────┘

Learn more about why this is disallowed and how to break cycles
here:<https://elm-lang.org/0.19.1/import-cycles>

```

- Let's revert the change made to the Time.elm file
- Then rename the file instead to be Main.elm (to match the module name).
- Rename Time.jsx to Main.jsx and edit content:
```js
// Main.jsx
import wrap from '@elm-react/component'
import Main from './Main.elm'
export default wrap(Main)
```


On page refresh for elm reactor, I now get this error:
```
-- MODULE NOT FOUND  /home/mando/Projects/github.com/mandolyte/react-elm-app/src/Main.elm

You are trying to import a `Time` module:

6| import Time
          ^^^^
I checked the "dependencies" and "source-directories" listed in your elm.json,
but I cannot find it! Maybe it is a typo for one of these names?

    Dict
    Bitwise
    Main
    Set

Hint: Maybe you want the `Time` module defined in the elm/time package? Running
elm install elm/time should make it available!
```

Run the advised command:
```
$ elm install elm/time
I found it in your elm.json file, but in the "indirect" dependencies.
Should I move it into "direct" dependencies for more general use? [Y/n]: Y
Success!
$ 
```

Boom! now elm reactor can run the elm code perfectly.

Now save updated App.js file (import change and component name change)

Fails... bummer. I only get a blank screen.

No errors that I can see. sigh..


Let's try his "counter" elm code.
No luck... also a blank screen.



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
