import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello, Docker React!</h1>
        <p>This React app is running in a Docker container</p>
        <p>Using node:18-alpine for build and nginx:alpine for serving</p>
      </header>
    </div>
  );
}

export default App;
