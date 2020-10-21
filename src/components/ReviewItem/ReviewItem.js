import React from 'react';

const ReviewItem = (props) => {
    
    const {name,quantity,key,price} = props.pd;
    return (
        <div style={{borderBottom: '1px solid green'}} className='review-item'>
            <h4>{name}</h4>
    <p>Quantity:{quantity}</p>
    <p><small>${price}</small></p>
    <br/>
    <button onClick={()=> props.removeProduct(key)} className='btn btn-secondary'>Remove</button>
        </div>
    );
};

export default ReviewItem;