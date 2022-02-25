import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './Counter'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Counter
          className="counter"
          value={count}
          messageFlag="Try it out!"
          onChange={(change) => setCount(count + change)}
        />        <a
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
