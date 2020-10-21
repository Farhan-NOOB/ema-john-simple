import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css'

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    return (
        <div className='header'>
          <img src={logo} alt=""/>
          <nav>
              <Link to="/shop">shop</Link>
              <Link to="/review">Order Review</Link>
              <Link to="/manage">Manage Order</Link>
              <button onClick={() =>{setLoggedInUser({})}} >Sign Out</button>
          </nav>
        </div>
    );
};

export default Header;