import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../../constants/userConstants"

import { base_url } from '../../constants/index'

const update = ({ userId, firstName, lastName, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, firstName, lastName, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { firstName, lastName, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {

    if(email=="axdev2020@gmail.com"){
      const { data } = await Axios.post(`${base_url}/user/login`, {
        headers: {
            'Content-Type' : 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
     })
     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
     Cookie.set('userInfo', JSON.stringify(data));
    }else{
      const { data } = await Axios.post(`${base_url}/user/login`, {
        headers: {
            'Content-Type' : 'application/json',
            'Accepts': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
     })
     dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    }
    
    
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { firstName, lastName, email, password } });
  try {
    const { data } = await Axios.post(`${base_url}/user/signup`, {
      headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
      },
      body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
      })
  });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update }