import React from 'react';
import QuantityControl from '../../../components/QuantityControl';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import {
    clearCart } from '../../../store/actions/cartActions'


const CartItem = props => {

    const dispatch = useDispatch();
    const removeFromCartHandler = () => {
        const product = {
                    productId: props.productId,
                    quantity: props.quantity,
                    total: props.total

                    }
        dispatch(clearCart(product));
      }


    return (
        <div className="SingleItem">
            <div className="ItemWrapper">
                <div className="ItemImage" style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={props.imageUrl} alt="" />
                </div>
                <div className="ItemDetails">
                    <p className="ItemName">{props.name}</p>
                    <p className="ItemPrice">{props.total}€</p>
                </div>
            </div>
            <div className="CartActionButtons">
                <QuantityControl
                    productId={props.productId}
                    name={props.name} 
                    quantity={props.quantity}
                    changeQuantity={props.changeQuantity}
                    increaseQuantity={props.increaseQuantity}
                    decreaseQuantity={props.decreaseQuantity}
                />
                <a href="#">Supprimer</a>
                <button type="button" className="button" onClick={() => removeFromCartHandler()} >
                 Supprimer
                 </button>
            </div>
        </div>
    )
}

export default CartItem;