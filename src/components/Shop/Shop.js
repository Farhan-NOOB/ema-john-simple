import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
   
  const first10 = fakeData.slice(0, 10);
  const [ products, setProducts]= useState(first10);

  const[cart,setCart]=useState([]);
   
  //similar code in (17-28)lines of Review.js component. 
  useEffect(()=>{
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);
      const previousCart = productKeys.map(existingKey =>{
          const product =fakeData.find(product => product.key === existingKey);
          product.quantity = savedCart[existingKey];
          return product;
        //   console.log(existingKey,savedCart[existingKey]);
      })
      setCart(previousCart);
  },[])


  const handleAddProduct = (product)=>{
    const sameProduct = cart.find(pd=> pd.key === product.key);
    // const count = sameProduct.length;
    let count = 1;
    let newCart;
    if(sameProduct){
         count = sameProduct.quantity+ 1;
        sameProduct.quantity = count;
        const others = cart.filter(pd=> pd.key !== product.key);
        newCart=[...others,sameProduct];
    }
    else{
        product.quantity=1;
        newCart=[...cart,product]
    }
    //   console.log('product added',product);
    //   const newCart = [...cart,product];
      
      setCart(newCart);
      
      addToDatabaseCart(product.key,count);
  }
    return (
        <div className='shop-container'>
           <div className="product-container">
               
                {
            products.map(product=><Product key={product.key} product={product} showButton={true} handleAddProduct={handleAddProduct}></Product>)
                }
           
           </div>
          <div className="cart-container">
              <Cart cart={cart}>
              <Link to="/review"><button className="btn btn-secondary">Review orders</button></Link>
              </Cart>
          </div>
            
        </div>
    );
};

export default Shop;