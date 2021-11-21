import React, {Component} from 'react';
import {Nav, Tab} from "react-bootstrap";
import Registro from "./Registro/Registro";
import Lista from "./Lista/Lista";

class Asistencia extends Component {
    render() {
        return (
            <div>
                <Tab.Container id="main-tabs" defaultActiveKey="lista">
                    <Nav fill variant="pills" className="redtabs">
                        <Nav.Item>
                            <Nav.Link eventKey="lista">Toma de asistencia</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-item-center" eventKey="registro">Registro</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="lista">
                            <Lista/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="registro">
                            <Registro/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default Asistencia;