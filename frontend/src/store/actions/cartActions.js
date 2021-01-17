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


export const addToCart = (cartItem) => async (dispatch, getState) => {
    try {
        console.log("add item to cart "+JSON.stringify(cartItem))
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.post(`${base_url}/cart/add`, cartItem, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      })

      console.log("item *********** "+ JSON.stringify(data.message))


      dispatch({
        type: ADD_TO_CART,
        cartItem: cartItem
       })
     
      const { cart: { cartItems } } = getState();
      Cookie.set("cartItems", JSON.stringify(cartItems));
      console.log("cartItems *********** "+ JSON.stringify(cartItems))
  
    } catch (error) {
  
    }
  }

export const getCartItems = (token, userId) => {
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
                })
               // const { cart: { cartItems } } = getState()
                //Cookie.set("cartItems", JSON.stringify(cartItems))
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
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