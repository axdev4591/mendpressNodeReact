import Axios from "axios";
import Cookie from "js-cookie";
import { ADD_TO_CART, GET_CART_DETAILS, UPDATE_CART, CLEAR_CART, CART_ADD_ITEM } 
from "../../constants/cartConstants"
import { base_url } from '../../constants/index'
/*
export const addToCart = (token, cartItem) => {
    return async dispatch => {
        try{
            console.log("anana add cart "+JSON.stringify(cartItem))
            console.log("anana add cart token"+JSON.stringify(token))
            const response = await fetch(`${base_url}/cart/add`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(cartItem),
                method: 'POST'
            });
            const jsonResposne = await response.json();
            if(response.status === 201){
                dispatch({
                    type: ADD_TO_CART,
                    cartItem: cartItem
                });
            }

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}
*/


export const addToCart = (userInfo, cartItems) => async (dispatch, getState) => {
    try {
        const { data } = await Axios.post(`${base_url}/cart/add`, cartItems, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      })
      dispatch({
        type: ADD_TO_CART,
        cartItem: cartItems
       })
     
      const { cart: { cartItem } } = getState();
      Cookie.set("cartItem", JSON.stringify(cartItem));
  
    } catch (error) {
        console.log(error);
    }
  }

export const getCartItems = (userInfo) => async (dispatch, getState) => {

        try{

            const data = await Axios.post(`${base_url}/cart/user/${userInfo.userId}`, userInfo, {
                headers: {
                  Authorization: ' Bearer ' + userInfo.token
                }
              })
           
            dispatch({
                type: GET_CART_DETAILS,
                cartItems: data.data.message[0]
            })
            const { cart: { cartItem } } = getState()
            Cookie.set("cartItem", JSON.stringify(data.data.message[0]))
      
        }catch(error){
            console.log(error);
        }
        
    }


export const updateCart = (token, userId, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`${base_url}/cart/update/quantity`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'PUT',
                body: JSON.stringify({
                    userId: userId,
                    productId: product.productId,
                    quantity: product.quantity,
                    total: product.total
                })
            });
            const jsonResposne = await response.json();

            if(response.status === 201){
                dispatch({
                    type: UPDATE_CART,
                    item: product
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CART,
            payload: null
        });
    }
}