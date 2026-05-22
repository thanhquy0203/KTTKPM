import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <main className="page">
      <section className="panel">
        <h1>React served by Nginx</h1>
        <p>This React app was built with Vite and served from an Nginx container.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
