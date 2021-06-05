import React from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="App">
      <Header headTitle="Coder's-Todos" />
      <Body />
    </div>
  );
};

export default App;
