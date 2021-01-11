import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Shop from './Shop';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import ControlPanel from './ControlPanel';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Home from './Home';
import Cart from './Cart';
import PlaceOrder from './PlaceOrder';
import ThankYou from './ThankYou';
import Orders from './Orders';

//Product reducer for admin
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  categoryListReducer,
  productListFilteredReducer
} from '../store/reducers/productReducers';

//User reducer 
import { userSigninReducer, userRegisterReducer, userUpdateReducer} from '../store/reducers/userReducers'

//Cart reducers
import cartReducers from '../store/reducers/cartReducers';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  productReviewSave: productReviewSaveReducer,
  productsFiltered: productListFilteredReducer,
  cart: cartReducers
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
            <Switch>
              
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/cpanel" component={ControlPanel} />
              <Route path="/products/:category/:slug" component={ProductDetails} />
              <Route path="/products"  component={Shop} />
              <PrivateRoute path="/cart" component={Cart} />
              <PrivateRoute path="/place-order" component={PlaceOrder} />
              <PrivateRoute path="/thank-you" component={ThankYou} />
              <PrivateRoute path="/orders" component={Orders} />
              <Route path="/"  component={Shop} />         
                         
            </Switch>
                     
        </div>
      </Router>
    </Provider>
      
    
    
  );
}

export default App;
