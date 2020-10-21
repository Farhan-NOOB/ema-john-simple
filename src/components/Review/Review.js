import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Review = () => {
   const[cart,setCart]= useState([]);
   const[orderPlaced,setOrderPlaced]= useState(false);
   const history = useHistory();

   //when I will click place order then:
   const handleProceedCheckout = () => {
       history.push('/shipment')
    //    console.log('order placed');
    // setCart([]) ;
    // setOrderPlaced(true);
    // processOrder();

}

   const removeProduct = (productKey) =>{
       console.log('remove clicked',productKey);
       const newCart = cart.filter(pd=> pd.key!==productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey);
   }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key=>{
            const product = fakeData.find(pd=>pd.key===key);
            product.quantity =savedCart[key];
            return product;
        });
        // console.log(counts);
        setCart(cartProducts);
        
    },[])
    
    let thankYou;
    if(orderPlaced){
     thankYou=<img src={happyImage} alt=""/>
    } 

    return (
        <div className="shop-container">
            <div className="product-container">
            <p>Total orders:{cart.length}</p>
           {
               cart.map(pd=><ReviewItem pd={pd} removeProduct={removeProduct} key={pd.key}></ReviewItem>)
           }
           {thankYou}
            </div>
            <div className="shop-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn btn-secondary">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;