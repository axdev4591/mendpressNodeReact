import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './style.css';
import CartItem from './CartItem'
import CartPrice from '../../components/CartPrice';


import { addToCart, updateCart, getCartItems} from '../../store/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'


const Cart = (props) => {

  const cart = useSelector(state => state.cart);
  const { cartItem, totalAmount, cartCount} = cart

  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

 
 
  useEffect(() => {
    /*if (userInfo) {
      dispatch(addToCart(userInfo, cartItems));
    }*/
    if(userInfo){
        dispatch(getCartItems(userInfo))
    }
  }, [])


  const decreaseQuantity = (e, productId) => {
        updateCart(productId, -1)
    }

  const increaseQuantity = (e, productId) => {
        updateCart(productId, 1);
    }

  const  updateCart = async (productId, quantity) => {
        try{
            
            let product = cartItem.find(item => item.product === productId);
            product = {
                productId: product.product,
                quantity: parseInt(product.quantity) + parseInt(quantity),
                newQuantity: quantity,
                price: product.price,
                total: parseFloat(product.total) + parseFloat( product.price * quantity )
            }
            if(product.quantity <= 0){
                return;
            }
            const response = await dispatch(updateCart(userInfo.token, userInfo.userId, product))
            if(response.ok == 1){

             /*  setCartItems( cartItem.map(item => item.product === productId ? 
                        {...item, quantity: item.quantity + quantity, total: item.total + (item.price * quantity)}: item)
                )*/
            }
        }catch(error){
            console.log(error);
        }
        
    }

  const changeQuantity = (e, productId) => {

         console.log(e.target.value);

         if(isNaN(e.target.value)){
         return;
         }

        const firstDigit = parseInt(e.target.value.split("")[0]);
        if(firstDigit === 0){
            return;
        }

        // //alert(e.target.value);

        updateCart(productId, parseInt(e.target.value));
    }

    console.log("************mon panier******* "+JSON.stringify(cartItem))
    return (
        <React.Fragment>
            <Header />
            <div className="Content">
                <div className="CartWrapper">
                    <div className="CartDetails">
                        {/* List cart items */}
                        <div className="CardTitle">
                            <h3>Mon panier</h3>
                        </div>
                        <div className="CardBody">

                            {cartItem.length === 0 ?
                                <div>
                                Vous n'avez aucun article dans votre panier
                                </div>
                                     :
                                     cartItem.map(product => 
                                    <CartItem
                                        key={product.product}
                                        productId={product.product}
                                        name={product.name}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                        quantity={product.quantity}
                                        total={product.total}
                                        //name="quantity" 
                                        changeQuantity={changeQuantity}
                                        increaseQuantity={increaseQuantity}
                                        decreaseQuantity={decreaseQuantity}
                                />)
                            }
                            

                            <div className="PlaceOrder">
                                <button className="PlaceOrderButton" onClick={() => props.history.push('/place-order')}>Passer la commande</button>
                            </div>

                        </div>
                    </div>
                    
                    <CartPrice />

                </div>
            </div>
        </React.Fragment>
    );

}


export default Cart