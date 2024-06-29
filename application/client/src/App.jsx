import './App.css';
import Navbar from './components/navbar/Navbar';
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
    <div>
      <Navbar />
      {data}
    </div>
  );
}

export default App;
