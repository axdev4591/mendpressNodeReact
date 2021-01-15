
import './style.css';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import BottomHeader from './BottomHeader/BottomHeader'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout, update } from '../../store/actions/userActions';

const  Header = (props) =>  {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
 

 
  const handleLogout = () => {
        props.logout();
        dispatch(logout());
        props.history.push("/");
    }

    const cartCount = userInfo ? cart.cartCount : '';

    return (
        <header className="Header">
            <TopHeader logout={handleLogout} />
            <MainHeader cartCount={cartCount} />
            <BottomHeader />
        </header>
    );
    
    
}

export default Header