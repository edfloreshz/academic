import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {isLogin} from '../../utils/LoginManager';

const PublicRoute = ({ component: Component, restricted, ...rest }: any) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted
                ? <Redirect to="/login" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;