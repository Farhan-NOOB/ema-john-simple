import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;

    let total = 0;
    for(let i = 0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price*product.quantity;
        
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }

    else if(total > 0){
        shipping = 12.99;
    }

    const tax = Math.round(total/10);
    return (
        <div>
            <h4 className="text-primary">Order summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product price: {total}</p>
            <p>Shipping Cost:{shipping}</p>
            <p><small>TAX + VAT: {tax}</small></p>
            <p>Total price:{total + shipping + tax}</p>
            <br/>
            {
                props.children
            }
            
        </div>
        
    );
};

export default Cart;