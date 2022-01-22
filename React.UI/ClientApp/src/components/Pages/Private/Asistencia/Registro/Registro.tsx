import React, {Component} from 'react';
import {IAula} from "../../../../../models/Aula";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {RequestType, send} from "../../../../../utils/RequestManager";
import ErrorMessage from "../../Error/ErrorMessage";
import {ZodIssue} from "zod";
import {IAsistencia} from "../../../../../models/Asistencia";
import AsistenciaImg from "../../../../../img/asistencia.svg";
import NotFound from "../../../../Layout/NotFound/NotFound";

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
    }
    
    render() {
        return (
            <div>
                <Card>
                    <Card.Header as="h5">
                        <div className="flex-titlebar">
                            Registro de Asistencia
                            <Button className="btn-sm"  variant="warning" onClick={this.queryRegistro}>Buscar</Button>
                        </div>
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
                        <Row>
                            <Container>
                                {this.state.asistencia.length > 0
                                    ?
                                        <div className="table-wrapper">
                                            <table>
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
                                            </table>
                                        </div>
                                    : this.state.loaded ?
                                        <NotFound
                                            title="Registro de asistencia"
                                            warning="No se encontraron registros"
                                            recommendation="Trate cambiando la fecha"
                                            picture={AsistenciaImg}
                                        />
                                        : null
                                }
                            </Container>
                        </Row>
                    </Card.Body>
                    
                    <Card.Footer>
                        <div style={{height: '15px'}}></div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Registro;