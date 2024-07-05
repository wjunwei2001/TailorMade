import './App.css';
import React from 'react';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    
  );
}

export default App;
