import axios from 'axios';
import {APIUri} from "./RequestManager";

async function login(email: string, password: string) {
    console.log({ email: email, password: password });
    await axios({
        method: 'post',
        url: `${APIUri}/authenticate`,
        data: { email: email, password: password }
    }).then((response) => {
        if ('token' in response.data) {
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("idDocente", response.data.idDocente);
            sessionStorage.setItem("usuario", `${response.data.nombre} ${response.data.apellidoPaterno} ${response.data.apellidoMaterno}`);
            sessionStorage.setItem("administrador", `${response.data.administrador}`);
        }
    }).catch((error) => {
        console.log(error);
    });
}

function isLogin() {
    if (sessionStorage.getItem('token'))
        return true;
    else
        return false;
}

function parseJwt(token: string) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

export { login, isLogin, parseJwt }