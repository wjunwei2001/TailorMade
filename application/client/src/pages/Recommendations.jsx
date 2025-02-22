import React from 'react'
import Navbar from '../components/Navbar2'
import ProductCard from '../components/ProductCard'
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom'

const Recommendations = () => {

  const location = useLocation();
  const { state } = location;
  

 

  return (
    <React.Fragment>
        <Navbar />
        <Grid container spacing={0}>
        {state.jsonData.map((props, index) => (
          <Grid item key={index} xs={6} sm={6} md={4} lg={3}>
            <ProductCard props={props} />
          </Grid>
        ))}
      </Grid>
    </ React.Fragment>
  )
}

export default Recommendations