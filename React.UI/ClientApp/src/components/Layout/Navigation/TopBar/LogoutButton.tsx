import React, { Component } from "react";
import { Button, Navbar } from "react-bootstrap";

export interface Props {

}

export interface State {

}

class LogoutButton extends Component<Props, State> {
    state = {}
    handleLogout() {
        sessionStorage.clear();
        window.location.reload();
    }
    render() {
        return (
            sessionStorage.getItem('token') ?
                (<Navbar.Collapse className="justify-content-end">
                    <Button id="logout-button" className="btn btn-warning" onClick={this.handleLogout}>Salir</Button>
                </Navbar.Collapse>)
                : (<div></div>)
        )
    }
}

export default LogoutButton;