import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] =useContext(userContext);
    const onSubmit = data => console.log(data);
  
     console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
     
        
        
        
        <input name="name" defaultValue={loggedInUser.name} placeholder="your name" ref={register({ required: true })} />
        
        {errors.name && <span className='error'>This name is required</span>}

        <input name="address" placeholder="your address"  ref={register({ required: true })} />
        
        {errors.address && <span className='error'>This address is required</span>}

        <input name="name" ref={register({ required: true })} />
        
        {errors.name && <span className='error'>This name is required</span>}

        <input name="name" ref={register({ required: true })} />
        
        {errors.name && <span className='error'>This name is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;