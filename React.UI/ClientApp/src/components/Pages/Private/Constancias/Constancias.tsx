import React, {Component} from "react";
import {Nav, Tab} from "react-bootstrap";
import {IAlumno} from "../../../../models/Alumno";
import {RequestType, send} from "../../../../utils/RequestManager";
import {ILoading} from "../../../../App";
import "./Constancias.css"
import Alumnos from "./Alumnos/Alumnos";
import Docentes from "./Docentes/Docentes";
import Spinning from "../../../Layout/Navigation/Spinning/Spinning";

interface Props {
}

export interface State extends ILoading {
    alumnos: IAlumno[],
}

class Constancias extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
            loading: true,
        }
    }

    async componentDidMount() {
        this.setState({alumnos: await send<IAlumno[]>(RequestType.GET, "Alumno").finally(() => this.setState({loading: false}))})
    }

    render() {
        if (this.state.loading) {
            return (<Spinning />)
        }
        return (
            <div>
                <Tab.Container id="main-tabs" defaultActiveKey="alumnos">
                    <Nav fill variant="pills" className="redtabs">
                        <Nav.Item>
                            <Nav.Link eventKey="alumnos">Alumnos</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link className="nav-item-center" eventKey="pagos">Docentes</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="alumnos">
                            <Alumnos/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pagos">
                            <Docentes/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    }
}

export default Constancias;