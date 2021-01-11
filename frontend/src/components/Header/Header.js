
import './style.css';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import BottomHeader from './BottomHeader/BottomHeader';
import * as authActions from '../../store/actions/authActions';
import * as cartActions from '../../store/actions/cartActions';
import { connect } from 'react-redux';


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../store/actions/userActions'
 import { logout, update } from '../actions/userActions';

const  Header = (props) =>  {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
 

 
    handleLogout = () => {
        this.props.logout();
        dispatch(logout());
    props.history.push("/");
    }

    const cartCount = userInfo.isAuthenticated ? cart.cartCount : '';

    return (
        <header className="Header">
            <TopHeader logout={handleLogout} />
            <MainHeader cartCount={cartCount} />
            <BottomHeader />
        </header>
    );
    
    
}

export default Header