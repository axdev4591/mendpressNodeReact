import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom'
import {usePath} from 'hookrouter';
import './styles.css'

const Product = props => {

    const path = usePath()
    //const url = path === '/' ? '/products/all' : path
    const url = '/products/all'
  
{/** <div className="Product">
    <div className="ProductImage">
        <img  src={props.imageUrl} alt="" />
    </div>
    <div className="ProductDetails">
        <p>{props.name} {console.log("imageurl :"+props.imageUrl)}</p>
        <p>{props.price}€</p>
    </div>
</div>*/}
    
    return (
        <Link to={`${url}/${props.slug}`}>         
            <div className="Product">
                <div className="ProductImage">
                    <img  src={props.imageUrl} alt="" />
                </div>
                <div className="ProductDetails">
                    <p className="nameP" style={{fontSize: "21px"}}>{props.name}</p>
                    <p style={{marginTop: "14px"}} className="priceP">{props.price}<span>€</span></p>
                    <div style={{marginTop: "7px", flexDirection: "column"}} className="btnP">
                        <span>Ajouter </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

//export default Product
export default withRouter(Product);