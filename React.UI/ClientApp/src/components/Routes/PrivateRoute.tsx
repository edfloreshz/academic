import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/LoginManager';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;