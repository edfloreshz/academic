import React, {Component} from 'react';
import {aulaSchema, IAula} from "../../../../../models/Aula";
import {Button, Card, Col, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import Select from "react-select/base";
import {RequestType, send} from "../../../../../utils/RequestManager";
import ErrorMessage from "../../Error/ErrorMessage";
import {setKeyValue} from "../../../../../models/Functions";
import {docenteSchema, IDocente} from "../../../../../models/Docente";
import {validate} from "../../../../../utils/ValidationManager";
import {ZodIssue} from "zod";
import Asistencia from "../Asistencia";
import {IAsistencia} from "../../../../../models/Asistencia";
import {IAlumno} from "../../../../../models/Alumno";

interface Props {
}

interface State {
    fecha: Date,
    aula: number,
    aulas: Array<IAula>,
    asistencia: Array<IAsistencia>
    errors: Array<ZodIssue>,
    loaded: boolean,
}

class Registro extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            fecha: new Date(),
            aula: 0,
            aulas: [],
            asistencia: [],
            errors: [],
            loaded: false,
        };
        this.queryRegistro = this.queryRegistro.bind(this);
    }

    async handleAula(event: React.FormEvent<HTMLInputElement>) {
        const aula = parseInt(event.currentTarget.value);
        this.setState({aula});
    }

    async handleFecha(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ fecha: new Date(event.currentTarget.value) })
    }

    async componentDidMount() {
        const aulas = await send<IAula[]>(RequestType.GET, "Aula");
        this.setState({
            aulas,
        });
    }
    
    async queryRegistro() {
        const { fecha, aula } = this.state;
        const asistencia = await send<IAsistencia[]>(
            RequestType.GET, 
            "Asistencia", 
            null, 
            `${fecha.toISOString().substring(0,10)}/${aula}`
        );
        this.setState({asistencia})
        this.setState({loaded: true})
        console.log(asistencia);
    }
    
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <Card.Title>Registro de Asistencia</Card.Title>
                            </Col>
                            <Col>
                                <Button className="headerButton" onClick={this.queryRegistro}>Buscar</Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <label>Periodo Inicial</label>
                                <input className="form-control date-withicon" type="date" name="periodoInicial" defaultValue={this.state.fecha.toString()} onChange={(event) => this.handleFecha(event)}/>
                            </Col>
                            <Col>
                                <Form.Group controlId="formBasicCurp">
                                    <Form.Label>Aula</Form.Label>
                                    <Form.Text>
                                        <select required name="aula" className="form-select" onChange={(e: any) => this.handleAula(e)}>
                                            <option selected value="0">Seleccione un aula</option>
                                            {
                                                this.state.aulas.map((aula) => {
                                                    return (
                                                        <option key={aula.idAula} value={aula.idAula}>{aula.nombre}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <ErrorMessage errors={this.state.errors} name="aula" />
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            
                        </Row>
                    </Card.Body>
                    {this.state.asistencia.length > 0 
                        ? 
                        <Card>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Aula</th>
                                        <th>Fecha</th>
                                        <th>Asistio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.asistencia.map((asistencia) => {
                                            return (
                                                <tr key={asistencia.idAsistencia}>
                                                    <td>{asistencia.idAlumnoNavigation?.nombres} {asistencia.idAlumnoNavigation?.apellidoPaterno} {asistencia.idAlumnoNavigation?.apellidoMaterno}</td>
                                                    <td>{asistencia.idAlumnoNavigation?.aulaNavigation?.nombre}</td>
                                                    <td>{
                                                        new Date(asistencia.fecha.toString()).toLocaleDateString("es-mx", {
                                                            weekday:"long",
                                                            year:"numeric",
                                                            month:"short",
                                                            day:"numeric"}
                                                        )
                                                    }</td>
                                                    <td>{asistencia.asistio ? "Si" : "No"}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Card>
                        : this.state.loaded ?
                            <Card>
                                <Card.Body>
                                    <Card.Text>
                                        No se encontraron registros
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            : null
                    }
                </Card>
            </div>
        );
    }
}

export default Registro;