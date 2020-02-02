import React from "react";

import Hero from "./Hero";
import About from "./About";

function App() {
  return <div className="App" />;
}

const Landing = () => {
  return (
    <>
      <Hero />
      <About />
      <App />
    </>
  );
};

export default Landing;
