import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



const PrivateRoute = ({component: Component, ...rest}) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    
    return <Route {...rest} render={(props) => {
        

        if(userInfo){
          
                return <Component {...props} />
        }else{
                return <Redirect to="/login" />
            
        }
        

    }} />
}

export default PrivateRoute;