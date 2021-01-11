import { Link } from 'react-router-dom';
import './style.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'


const TopHeader = () => {

    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin

    const handleLogout = () => {
      dispatch(logout());
      props.history.push("/");
    }
 
    let guestAccount = <ul className="Dropdown Account">
                            <li><Link to="/signup"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>S'inscrire</span></Link></li>
                            <li><Link to="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Se connecter</span></Link></li>
                        </ul>;  
    
    if(userInfo.isAuthenticated){

        if(userInfo.username=="admin"){
            guestAccount = <ul className="Dropdown Account">
            <li><Link to="/orders"><i className="far fa-clipboard"></i>&nbsp;&nbsp;<span>Commandes</span></Link></li>
            <li><Link to="/manageusers"><i className="fas fa-users"></i>&nbsp;&nbsp;<span>Utilisateurs</span></Link></li>
            <li><Link to="/manageproducts"><i className="fas fa-book"></i>&nbsp;&nbsp;<span>Produits</span></Link></li>
            <li><Link to="" onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>Se déconnecter</span></Link></li>
        </ul>;
        }else{
            guestAccount = <ul className="Dropdown Account">
            <li><Link to="/orders"><i className="far fa-clipboard"></i>&nbsp;&nbsp;<span>Commandes</span></Link></li>
            <li><Link to="" onClick={() => handleLogout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>Se déconnecter</span></Link></li>
        </ul>;
        }
     
                
            
        }

        return (
            <div className="TopHeader">
                <div className="SocialMediaIcons">
                <ul className="TopMenu">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-google-plus-g"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-youtube"></i>
                </ul>
                </div>
                <div>
                    <ul className="TopMenu">
                        <li className="MenuItem">
                            <i className="fas fa-user-circle" ></i>&nbsp;&nbsp;
                            <Link to="/account">{userInfo.isAuthenticated ? userInfo.username: 'Mon compte'}</Link>
        
                            {guestAccount}
                        </li>
                    </ul>
                </div>
            </div>
        )
    
}


export default TopHeader;