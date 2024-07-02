import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { useState, useEffect } from "react";

// functions
import { getTest } from "./functions/test";

function App() {

  const [data, setData] = useState("ur mom");

  useEffect(() => {
    getTest().then((res) => {
      setData(res.message);
    })
    .catch(err => console.log(err))
  }, []);


  return (
    <React.Fragment>
      <Navbar />
      {data}
    </React.Fragment>
    
  );
}

export default App;
