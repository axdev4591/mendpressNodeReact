
import './style.css';
import Product from './Product';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {usePath} from 'hookrouter'

import {listCategories, listProducts} from '../../../store/actions/productActions'


const Products = (props) => {

    const [title, setTitle] = useState('Toutes Nos Oeuvres')
    const [slug, setSlug] = useState('')
    const [filter, setFilter] = useState(1)
    const productList = useSelector((state) => state.productList)
    const {loading, products} = productList

    const categoryList = useSelector((state) => state.categoryList)
    const {categories} = categoryList
    const url = usePath()
    const dispatch = useDispatch()

    console.log("##########################this the slug: "+slug)
    console.log("##########################this the path: "+url)
    
    useEffect(() => {
              
        dispatch(listProducts(slug, filter))
        dispatch(listCategories())
        
        return () => {
          //
        }
      }, [slug, filter, url])

  
    return (

        <div className="Content">
                <div className="ContentTitle">
                     <h2 className="CategoryTitle">{title}</h2>
                </div>
                <div className="ContentBody">
                    <div className="SideMenu">
                        <h3 className="SideMenuTitle">Filtres</h3>
                        <div className="Filter">
                            <p className="FilterTitle">Categories</p>
                            <ul>
                                {
                                    categories.map((value) => ( 
                                    <li key={value._id}>
                                    <Link to={`/products/${value.slug}`} onClick={() => {
                                             
                                            setSlug(value.slug)
                                            setTitle(value.name)
            
                                    } }>{value.name}
                                    </Link>
                                   
                                    </li>))
                                    
                                }
                            </ul>
                        </div>
                        
                        <div className="Filter">
       
                            <p className="FilterTitle">Prix</p>
                            <div>
                                <button onClick={() => setFilter(1)} className="FilterButton">Tri croissant</button>
                            </div>
                            <div>
                                <button onClick={() => setFilter(-1)} className="FilterButton">Tri décroissant</button>
                            </div>
                            
                        </div>
                    
                    </div>
                    
                    <div className="MainContent">

                    <div className="ProductArea">
                        {
                            products.map(product => <Product
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                description={product.description}
                                imageUrl={product.imageUrl}
                                slug={product.slug}
                            />)
                        }
                        
                    </div>

                        
                    </div>

                </div>
            </div>
        
    )
    
}


export default Products