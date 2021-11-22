import React, { Component } from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import { IAlumno } from "../../../../../models/Alumno";
import { RequestType, send } from "../../../../../utils/RequestManager";
import { IAsistencia } from "../../../../../models/Asistencia";
import Spinning from "../../../../Layout/Navigation/Spinning/Spinning";
import { ILoading } from "../../../../../App";
import Class from "./Class";
import Asistencia from "../../../../../img/alumnos.svg";
import "./Lista.css"

export interface Props {

}

export interface State extends ILoading {
    alumnos: IAlumno[],
    asistencia: IAsistencia[]
}

class Lista extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
            asistencia: [],
            loading: true,
        }
        this.postAsistencia = this.postAsistencia.bind(this);
    }

    async postAsistencia() {
        let asistencia = this.state.alumnos.map((alumno: IAlumno) => ({
            idAsistencia: 0,
            idAlumno: alumno.idAlumno,
            asistio: (typeof alumno.presente === 'undefined') ? false : alumno.presente,
            fecha: new Date(),
        }));
        await send(RequestType.POST, "Asistencia", asistencia)
        this.setState({
            alumnos: await send<IAlumno[]>(
                RequestType.GET,
                "GetAlumnosAulaDocente",
                null,
                sessionStorage.getItem("idDocente"),
                "?isAsistencia=true"
            )
        })
        this.forceUpdate()
    }

    // Toggle present
    studentPresent = (idAlumno: number) => {
        this.setState({
            alumnos: this.state.alumnos.map(alumno => {
                if (alumno.idAlumno === idAlumno) {
                    alumno.presente = !alumno.presente
                }
                return alumno;
            })
        });
    }

    async componentDidMount() {
        this.setState({
            alumnos: await send<IAlumno[]>(
                RequestType.GET,
                "GetAlumnosAulaDocente",
                null,
                sessionStorage.getItem("idDocente"),
                "?isAsistencia=true"
            ).finally(() => this.setState({ loading: false }))
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <Spinning />
            )
        }
        if (this.state.alumnos.length > 0) {
            return (
                <Card>
                    <Card.Header as="h5">
                        <Row>
                            <Col>
                                Lista de asistencia
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <table>
                            <tbody>
                            <tr>
                                <th className="">ID</th>
                                <th className="nameCol">Nombre</th>
                                <th className="nameCol">Fecha</th>
                                <th className="switchCol">Asistencia</th>
                            </tr>
                            </tbody>
                        </table>
                        <Class alumnos={this.state.alumnos} studentPresent={this.studentPresent} />
                    </Card.Body>
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Button onClick={this.postAsistencia}>Guardar</Button>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card >
            )
        } else {
            return (
                <Card>
                    <Card.Header as="h5">
                        <Row>
                            <Col>
                                Lista de asistencia
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body className="center-text">
                        <Card.Img src={Asistencia} />
                        <Card.Text>
                            <h4>
                                <b>Asistencia tomada</b>
                            </h4>
                            <h5>
                                Espere hasta mañana para poder tomar asistencia.
                            </h5>
                        </Card.Text>
                    </Card.Body>
                </Card >
            )
        }
    }
}

export default Lista;