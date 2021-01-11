import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import Logo from './MEND.png';

import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';
import Error from '../../components/Error';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../store/actions/userActions'

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);


loginHandler = (e) => {
    e.preventDefault();

    if(email === ''){
        setIsError(true)
        setErrorMessage('Enter Email'); return;
    }

    const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    if(!emailPattern.test(email)){
        setIsError(true)
        setErrorMessage('Invalid Email Address'); return;
    }

    if(this.state.password === ''){
        setIsError(true)
        setErrorMessage('Enter Password'); return;
    }

    dispatch(signin(email, password))
    }


  return <div className="LoginContainer">
  <div className="WelcomeText">
      <h3>Login</h3>
  </div>
  {loading && <div>Loading...</div>}
  {error && <div>{error}</div>}
  <img src={Logo} alt="logo" height="80" width="260"/> 
  <div className="LoginWrapper">
      <p></p>
      <form onSubmit={loginHandler} autoComplete="off">
  
          <MobileTypeInput 
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
          />
          <MobileTypeInput 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
          />
  
          <Error>
              {errorMessage}
          </Error>
          
          <SubmitGradientButton 
              label="Login"
              style={{marginTop: '30px'}}
          />
      </form>
  
      
  
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Link to="/signup">Create a new account</Link>
      <Link to="/forget-password">Forgot Password ?</Link>
  </div>
  
  
  </div>
}
export default SigninScreen;