import React from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom';

const Recommendations = () => {

  const location = useLocation();
  const { state } = location;

  return (
    <React.Fragment>
        <Navbar />
        
    </ React.Fragment>
  )
}

export default Recommendations