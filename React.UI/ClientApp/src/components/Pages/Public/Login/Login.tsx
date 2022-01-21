import React, { Component } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import Logo from '../../../../img/logo.jpg';
import { login, isLogin } from '../../../../utils/LoginManager';

export interface Props {

}

export interface State {
    email: string,
    password: string,
    error: string
}

class Login extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmail(e: any) {
        this.setState({
            email: e.target.value
        });
    }

    handlePassword(e: any) {
        this.setState({
            password: e.target.value
        });
    }

    async handleLogin(e: any) {
        await login(this.state.email, this.state.password);
        if (!isLogin())
            this.setState({ error: "Email o contraseña incorrecto." });
        else {
            window.location.href = "/home";
        }
    }

    render() {
        return (
            <div className="login-container">
                <Card className="login-form">
                    <Card.Header as="h5">Iniciar sesión</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Inicie sesión con su correo y contraseña.
                        </Card.Text>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control value={this.state.email} onChange={this.handleEmail} type="email" placeholder="Correo electrónico" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control value={this.state.password} onChange={this.handlePassword} type="password" placeholder="Contraseña" />
                                <Form.Text className="text-muted">
                                    No compartiremos esta información con nadie.
                                </Form.Text>
                                <Form.Text className="text-muted">
                                    {this.state.error}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="danger" onClick={this.handleLogin}>
                                Iniciar sesión
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Login;