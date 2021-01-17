import { Link } from 'react-router-dom';
import './style.css';
import React, { useEffect } from 'react'
import { logout, update } from '../../../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'


const TopHeader = (props) => {

    const dispatch = useDispatch()
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin

    const handleLogout = () => {
      dispatch(logout());
    }

 
    let guestAccount = <ul className="Dropdown Account">
                            <li><Link to="/signup"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>S'inscrire</span></Link></li>
                            <li><Link to="/login"><i className="fas fa-user"></i>&nbsp;&nbsp;<span>Se connecter</span></Link></li>
                        </ul>;  
    
    if(userInfo){

        if(userInfo.isAdmin==true){
            guestAccount = <ul className="Dropdown Account">
            <li><Link to="/orders"><i className="far fa-clipboard"></i>&nbsp;&nbsp;<span>Commandes</span></Link></li>
            <li><Link to="/manageusers"><i className="fas fa-users"></i>&nbsp;&nbsp;<span>Utilisateurs</span></Link></li>
            <li><Link to="/manageproducts"><i className="fas fa-book"></i>&nbsp;&nbsp;<span>Produits</span></Link></li>
            <li><Link to="" onClick={() => handleLogout()}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;<span>Se déconnecter</span></Link></li>
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
                            <Link to="/account">{userInfo ? userInfo.firstName: 'Mon compte'}</Link>
        
                            {guestAccount}
                        </li>
                    </ul>
                </div>
            </div>
        )
    
}


export default TopHeader;