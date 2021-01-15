import { base_url } from '../../constants/index'
import Cookie from 'js-cookie';

import {
ADD_TO_CART,
GET_CART_DETAILS,
UPDATE_CART,
CLEAR_CART,
} from '../../constants/cartConstants'

 const addToCart = (token, cartItem) => {
    return async (dispatch, getState) => {
        try{
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
                })
            }
            const { cart: { cartItems } } = getState();
            Cookie.set("cartItems", JSON.stringify(cartItems));

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}

 const getCartItems = (token, userId) => {
    return async dispatch => {

        try{

            const response = await fetch(`${base_url}/cart/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'POST'
            });

            const jsonResposne = await response.json();
            if(response.status === 200){
                dispatch({
                    type: GET_CART_DETAILS,
                    cartItems: jsonResposne.message[0]
                });
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
    }
}

 const updateCart = (token, userId, product) => {
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

 const clearCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CLEAR_CART, payload: productId })
  
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems))
}


const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CLEAR_CART, payload: productId });
  
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  }
 /* const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  }
  const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
  }
*/
export {
    addToCart,
    getCartItems,
    updateCart,
    clearCart
}