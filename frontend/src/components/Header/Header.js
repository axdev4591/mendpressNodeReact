
import './style.css';
import TopHeader from './TopHeader/TopHeader';
import MainHeader from './MainHeader/MainHeader';
import BottomHeader from './BottomHeader/BottomHeader'

import { addToCart, updateCart, getCartItems} from '../../store/actions/cartActions'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { logout, update } from '../../store/actions/userActions';

const  Header = (props) =>  {

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItem, totalAmount, cartCount} = cart
  const dispatch = useDispatch();
 

  useEffect(() => {
    dispatch(getCartItems(userInfo))
    
  }, [])
 
  const handleLogout = () => {
        props.logout();
        dispatch(logout());
        props.history.push("/");
    }

    const cartCounter = userInfo ? cartCount : '';

    return (
        <header className="Header">
            <TopHeader logout={handleLogout} />
            <MainHeader cartCount={cartCounter} />
            <BottomHeader />
        </header>
    );
    
    
}

export default Header