
import Header from '../../components/Header/Header';
import './style.css';
import React, {useEffect,  useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import {useParams } from 'react-router-dom'
import { detailsProduct } from '../../store/actions/productActions';
import { addToCart } from '../../store/actions/cartActions'
import {usePath} from 'hookrouter';
//import Rating from '../components/Rating';
//import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

const ProductDetails = (props) => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const productDetails = useSelector((state) => state.productDetails)
  const { product, loading, error } = productDetails
  const dispatch = useDispatch()
  const { category, slug } = useParams()
  const { category1, slug1 } = props.match.params;

  console.log('params***************************** '+category+category1)

  useEffect(() => {
    
    dispatch(detailsProduct(category, slug))

    return () => {
      //
    };
  }, [slug, category]);


  const addItemToCart = (product) => {

    if(!userInfo){
        props.history.push('/login');
        return;
    }else {
        if(!userInfo.isAdmin){
            const cartItem = {
                user: userInfo.id,
                product: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                quantity: 1,
                price: product.price
            }
        
           dispatch(addToCart(cartItem))
        }
    } 
   
}


    let productDescription

    if(product){
        productDescription = 
            <div style={{marginBottom: "12px"}} className="Content">
                <div style={{marginTop: "12px"}} className="ProductDetailsWrapper">
                    <div className="ProductDetailsImage">
                        <div className="ProductDetailsImageWrapper">
                            <img src={product.imageUrl} alt="" />
                        </div>
                        <div className="ActionButtonWrapper">
                             <button  style={{marginRight: "6px"}} onClick={() => addItemToCart(product)}><i className="fas fa-shopping-cart" style={{marginRight: "3px"}}></i>&nbsp;Ajouter au panier</button>        
                        </div>
                        
                    </div>
                    <div className="ProductDetails">
                        <p className="ProductTitle">{product.name}</p>
                        <p className="ProductPrice">{product.price}€</p>
                        <div className="BreadCrumb">
                            <small>Auteur: Nene DOGBA | Date de parition: 12 mars 2020</small>
                            <small>{ product.stock > 0 ? "  "+ product.stock  + " exemplaire en stock" : "Rupture de stock"  } | Expédition sous 24 heures</small>
                            
                        </div>
                        <div className="ProductDescription">
                            <h3 style={{marginTop: "17px"}}>Description</h3>
                            <div className="BreadCrumb">
                            <small>{product.description}</small>
                            </div>

                            <h4 style={{marginTop: "18px"}}>A propos de l'auteur</h4>
                            <div className="BreadCrumb">
                            <small>      
                            <p>laceholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available</p>
                            </small>
                            </div>
                         
                        </div>
                        <div style={{marginTop: "51px"}} className="ActionButtonWrapper">
                        <button onClick={() => { if(userInfo){
                                  }
                                  }} style={{marginRight: "6px"}}><i className="fas fa-bolt" style={{marginRight: "3px"}}></i>&nbsp;Acheter maintenant</button>
                        </div>
                    </div>
                </div>

            </div>
    }else{
        productDescription = <div>Product is loading...!</div>
    }
    
    

    return (
        <div>
            {productDescription}
        </div>
    );
    

}



export default ProductDetails