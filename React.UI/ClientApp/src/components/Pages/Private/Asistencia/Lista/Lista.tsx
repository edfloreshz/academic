import React, { Component } from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import { IAlumno } from "../../../../../models/Alumno";
import { RequestType, send } from "../../../../../utils/RequestManager";
import { IAsistencia } from "../../../../../models/Asistencia";
import Spinning from "../../../../Layout/Navigation/Spinning/Spinning";
import { ILoading } from "../../../../../App";
import Class from "./Class";
import "./Lista.css"
import NotFound from "../../../../Layout/NotFound/NotFound";
import AsistenciaImg from '../../../../../img/asistencia.svg';

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
                    {
                        (this.state.alumnos.length > 0) 
                        ?
                            <>
                                <table>
                                    <tbody>
                                    <tr>
                                        <th className="">ID</th>
                                        <th className="nameCol">Nombre</th>
                                        <th className="nameCol">Fecha</th>
                                        <th className="nameCol">Asistencia</th>
                                    </tr>
                                    </tbody>
                                </table>
                                <Class alumnos={this.state.alumnos} studentPresent={this.studentPresent} />
                            </>
                        :
                            <NotFound
                                title="Lista de asistencia"
                                warning="Asistencia tomada"
                                recommendation="Espere hasta mañana para poder tomar asistencia"
                                picture={AsistenciaImg}
                            />
                    }
                </Card.Body>
                <Card.Footer>
                    <Row>
                        {
                            (this.state.alumnos.length > 0) ?
                                <Col>
                                    <Button variant="warning" onClick={this.postAsistencia}>Guardar</Button>
                                </Col>
                                : <div style={{height: '15px'}}></div>
                        }
                        
                    </Row>
                </Card.Footer>
            </Card >
        )
    }
}

export default Lista;