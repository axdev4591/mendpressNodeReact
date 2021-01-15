
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_REVIEW_SAVE_REQUEST,
    PRODUCT_REVIEW_SAVE_FAIL,
    PRODUCT_REVIEW_SAVE_SUCCESS,
  } from '../../constants/productConstants'
  
  import axios from 'axios'
  import Axios from 'axios'
  import { base_url } from '../../constants/index'


  //retrieve product for home page
 const listProductsFiltered = (categorySlug = '', filter) => {
        return async (dispatch) => {

            try{

                categorySlug = (categorySlug == 'all') ? '' : categorySlug;

                let query = '';
                if(filter){
                    query = '?filter=1&'
                    for(let prop in filter){
                        query += `${prop}=${filter[prop]}&`
                    }
                    query = query.substring(0, query.length-1);
                }

                const response = await fetch(`${base_url}/products/${categorySlug}${query}`)
                
                const jsonResponse = await response.json();
                if(response.status == 200){
                    dispatch({
                        type: PRODUCT_LIST_REQUEST,
                        payload: jsonResponse.message
                    });
                }

                console.log("########prod "+JSON.stringify(jsonResponse.message))
                return jsonResponse;

            }catch(error){
                console.log(error);
            }

        }
    }

  //retrieve product for admin dashboard
  const listProducts = (categorySlug = '', filter) => async (dispatch) => {
    console.log("list des produit: *****************")
     
        if(categorySlug == ''){
          try{
            dispatch({ type: PRODUCT_LIST_REQUEST });
            const { data } = await axios.get(`${base_url}/products/${filter}`)
            console.log(`${base_url}/products/${filter}`)
      
            dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message })
          }
          catch (error) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
          }
        }
        else{
          try{


          dispatch({ type: PRODUCT_LIST_REQUEST });
          const { data } = await axios.get(`${base_url}/products/${categorySlug}/${filter}`)
          console.log(`${base_url}/products/${categorySlug}/${filter}`)
      
          dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.message })
          }catch (error) {
            dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
          }
        }


  
  }
  
  //retrieve category
  const listCategories = () => async (dispatch) => {  
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })
      const { data } = await axios.get(`${base_url}/category`)
    
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.message })
    } catch (error) {
      dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
      console.log(error.message)
    }
  }

  //Create product or update product
  const saveProduct = (product) => async (dispatch, getState) => {
    
    try {
        const {
            userSignin: { userInfo },
          } = getState();
        
        if(userInfo.email=="axdev2020@gmail.com"){
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product })
        
        const products = new FormData()
        products.append("id", product._id)
        products.append("name", product.name)
        products.append("price", product.price)
        products.append("description", product.description)
        products.append("imageUrl", product.imageUrl)
        products.append("stock", product.stock)
        products.append("category", product.category)

        if (product.create) {
            const { data } = await Axios.post(`${base_url}/products/create`, products, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': userInfo.token
            },
            })

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data.message });

        } else {
            const { data } = await Axios.put(`${base_url}/products/update/${product._id}`,  products, {
                headers: {
                'Content-Type': 'application/json',
                'auth-token':  userInfo.token
            },
            }
            )

            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data.message })

        }
        }
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message })
        }
  };



  //get prodcut detail
  const detailsProduct = (categorySlug, productSlug) => async (dispatch) => {
    try {
      
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productSlug })
      const { data } = await axios.get(`${base_url}/products/detail/${categorySlug}/${productSlug}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.message })
      console.log("detail prod*********"+JSON.stringify(data.message))
      
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  }
 
  const deleteProduct = (product) => async (dispatch, getState) => {
    try {
      console.log('start deleteig **********')
      const {
        userSignin: { userInfo },
      } = getState();
    
    if(userInfo.email=="axdev2020@gmail.com"){
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product._id })
      const { data } = await axios.delete(`${base_url}/products/delete/${product._id}`, {
        headers: {
          'auth-token': userInfo.token
        },
      })
      console.log('success deleted')
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
    }} catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
    }
  }
  
  const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  }


  export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProduct,
    saveProductReview,
    listCategories,
    listProductsFiltered
  }
  
