import { NavLink, Link } from 'react-router-dom';
import './style.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {listCategories, listProducts} from '../../../store/actions/productActions'


const BottomHeader = (props) => {

    const categoryList = useSelector((state) => state.categoryList)
    const {categories} = categoryList

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listCategories())

    }, [])
   
    


    const categoryTree = (categories) => {

        //console.log(categories);

        var categoriesAr = [];
        for(var value of categories){

            categoriesAr.push(
                    <li key={value.slug} className="Column">
                        <NavLink to={`/products/${value.slug}/1`}>{value.name}</NavLink>
                        {value.children.length > 0 ? (<ul>{this.categoryTree(value.children)}</ul>) : null}
                    </li>
            );
        }

        return categoriesAr;
    }

 
        const cat = categoryTree(categories);

        return (
            <div className="BottomHeader">
                <ul className="Menu">
                    <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
                    <li className="MenuItem">
                        <Link to="/products" className="MenuItemElement">Boutique&nbsp;<i className="fas fa-caret-down"></i></Link>
                        
                        <ul className="Dropdown">
                        {cat}
                        
                        </ul>
                    </li>
                    <li className="MenuItem"><Link to="/products">Produits</Link></li>
                    <li className="MenuItem"><Link to="/about">A propos</Link></li>
                    <li className="MenuItem"><Link to="/contact">Contact</Link></li>
                    
                </ul>
    
            </div>
        );
}



export default BottomHeader;