import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/LoginManager';

const AdminRoute = ({ component: Component, ...rest }: any) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && sessionStorage.getItem("administrador") === "true" ?
                <Component {...props} />
                : <Redirect to="/asistencia" />
        )} />
    );
};

export default AdminRoute;