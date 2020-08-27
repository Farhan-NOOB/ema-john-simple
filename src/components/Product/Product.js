import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    console.log(props);
    const {img,name,seller,price,stock}=props.product;
    return (
        <div className='product'>
            <div>
               <img src={props.product.img} alt=""/>
            </div>
            <div>
            <h4 className='productName'>{props.product.name}</h4>
            <br/>
            <p><small>By:{seller}</small></p>
            <p>${price}</p>
            <p><small>only {stock} left in stock-order soon</small></p>
            <button className='main-button' onClick={() =>props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;