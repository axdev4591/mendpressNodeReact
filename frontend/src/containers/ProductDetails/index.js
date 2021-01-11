
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import * as cartActions from '../../store/actions/cartActions';

import './style.css';
import { base_url } from '../../constants';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

const ProductDetails = (props) => {
  const [qty, setQty] = useState(1)
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails
  const { success: productSaveSuccess } = productReviewSave
  const dispatch = useDispatch()

  useEffect(() => {
    
    dispatch(detailsProduct(props.match.params.id))
    return () => {
      //
    };
  }, [productSaveSuccess]);


addToCart = (product) => {

    if(!userInfo.isAuthenticated){
        props.history.push('/login');
        return;
    }

    const cartItem = {
        user: userInfo.id,
        product: product._id,
        name: name,
        imageUrl: product.imageUrl,
        quantity: 1,
        price: product.price
    }

    props.addToCart(userInfo.token, cartItem)
    .then(response => {
        //console.log(response);
        console.log(props.cart);
    })
    .catch(error => {
        console.log(error);
    });
}


    let productDescription;

    if(product){
        productDescription = 
            <div style={{marginBottom: "12px"}} className="Content">
                <div style={{marginTop: "12px"}} className="ProductDetailsWrapper">
                    <div className="ProductDetailsImage">
                        <div className="ProductDetailsImageWrapper">
                            <img src={product.imageUrl} alt="" />
                        </div>
                        <div className="ActionButtonWrapper">
                            <button  style={{background: '#483D8B'}} onClick={() => { addToCart(product) }}><i className="fas fa-shopping-cart"></i>&nbsp;Ajouter au panier</button>
                            <button style={{background: '#483D8B'}}><i className="fas fa-bolt"></i>&nbsp;Acheter maintenant</button>
                        </div>
                    </div>
                    <div className="ProductDetails">
                        <div className="BreadCrumb">
                            <small>Bonne lecture</small>
                        </div>
                        <p className="ProductTitle">{product.name}</p>
                        <p className="ProductPrice">{product.price}€</p>
                        <div className="ProductDescription">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>

            </div>
    }else{
        productDescription = <div>Product is loading...!</div>
    }
    
    

    return (
        <div>
            <Header/>
            {productDescription}
        </div>
    );
    

}



export default ProductDetails