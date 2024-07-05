import React from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { useLocation } from 'react-router-dom'

const Recommendations = () => {

  const location = useLocation();
  const { state } = location;
  

  return (
    <React.Fragment>
        <Navbar />
        {state.jsonData.map((product, index) => (
          <ProductCard key={index} _id={product._id}
          img={product.img}
          productName={product.productName}
          price={product.price}
          color={product.color}/>
        ))}
    </ React.Fragment>
  )
}

export default Recommendations