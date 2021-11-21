import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {RequestType, send} from "../../../../../utils/RequestManager";
import {docenteSchema, IDocente} from "../../../../../models/Docente";
import {setKeyValue} from "../../../../../models/Functions";
import {validate} from "../../../../../utils/ValidationManager";
import {IAula} from "../../../../../models/Aula";
import {ZodIssue} from "zod";
import Swal from "sweetalert2";
import ErrorMessage from "../../Error/ErrorMessage";


export interface Props {
    show: boolean,
    docente: IDocente,
    handleClose: () => void
}

export interface State {
    docente: IDocente,
    aulas: IAula[],
    errors: Array<ZodIssue>,
}

class Edit extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            docente: this.props.docente,
            aulas: [],
            errors: []
        }
        this.updateDocente = this.updateDocente.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        this.setState({
            aulas: await send<IAula[]>(RequestType.GET, "Aula")
        })
    }

    async handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        if (this.isAdminTryToKillItself(event))
            return;
        let isAulaTaken;
        if (name === "aulaAsignada")
            isAulaTaken = await send<boolean>(RequestType.GET, "isAulaTaken", null, value);
        if (isAulaTaken) {
            await Swal.fire({
                title: "Aula ocupada",
                text: "La aula seleccionada está ocupada, por favor seleccione otra",
                icon: "error",
                confirmButtonText: "Ok"
            });
            return;
        }
        let docente = setKeyValue(this.state.docente, name as keyof IDocente, value);
        this.setState({
            errors: await validate(name, docente, docenteSchema)
        })
        this.setState({ docente })
    }
    
    isAdminTryToKillItself = (event: React.FormEvent<HTMLInputElement>) => {
        const idDocente = (sessionStorage.getItem("idDocente") != null) ? parseInt(sessionStorage.getItem("idDocente") as string) : 0;
        return sessionStorage.getItem("administrador") === "true" && this.state.docente.idDocente === idDocente
            && (event.currentTarget.name === "activo" || event.currentTarget.name === "administrador");
    }
    
    async updateDocente() {
        if (this.state.errors.length === 0) { 
            await send(RequestType.PUT, "updateUser", this.state.docente, this.state.docente.idDocente, "", this.props.handleClose);
        } else {
            await Swal.fire({
                title: 'Error',
                text: 'Revise los campos en rojo',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control value={this.state.docente.nombres} onChange={async (event: any) => await this.handleInputChange(event)} name="nombres" type="text" placeholder="Nombres" />
                            <ErrorMessage errors={this.state.errors} name="nombres" />
                        </Form.Group>
                        <Row>
                            <Col sm="12" md="12" lg="6"><Form.Group controlId="formBasicLastName">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control value={this.state.docente.apellidoPaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoPaterno" type="text" placeholder="Apellido paterno" />
                                <ErrorMessage errors={this.state.errors} name="apellidoPaterno" />
                            </Form.Group></Col>
                            <Col sm="12" md="12" lg="6"><Form.Group controlId="formBasicSecondLastName">
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control value={this.state.docente.apellidoMaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoMaterno" type="text" placeholder="Apellido materno" />
                                <ErrorMessage errors={this.state.errors} name="apellidoMaterno" />
                            </Form.Group></Col>
                        </Row>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={this.state.docente.email} onChange={async (event: any) => await this.handleInputChange(event)} name="email" type="text" placeholder="Email" />
                            <ErrorMessage errors={this.state.errors} name="email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" required onChange={async (event: any) => await this.handleInputChange(event)} name="password" placeholder="Contraseña" />
                            <ErrorMessage errors={this.state.errors} name="password" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicCurp">
                                    <Form.Label>Activo</Form.Label><br/>
                                    {
                                        this.state.docente.activo
                                            ? <Button variant="success" name="activo" value="false" onClick={(e: any) => this.handleInputChange(e)}>Activo</Button>
                                            : <Button variant="warning" name="activo" value="true" onClick={(e: any) => this.handleInputChange(e)}>Inactivo</Button>
                                    }
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formBasicCurp">
                                    <Form.Label>Administrador</Form.Label><br/>
                                    {
                                        this.state.docente.administrador
                                            ? <Button variant="success" name="administrador" value="false" onClick={(e: any) => this.handleInputChange(e)}>Activo</Button>
                                            : <Button variant="warning" name="administrador" value="true" onClick={(e: any) => this.handleInputChange(e)}>Inactivo</Button>
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicCurp">
                                    <Form.Label>Aula</Form.Label>
                                    <Form.Text>
                                        <select required key={this.state.docente.idDocente} name="aulaAsignada" className="form-select" defaultValue={this.state.docente.aulaAsignada} onChange={(e: any) => this.handleInputChange(e)}>
                                            <option selected value="0">Seleccione un aula</option>
                                            {
                                                this.state.aulas.map((aula) => {
                                                    return (
                                                        <option key={aula.idAula} selected={aula.idAula === this.state.docente.aulaAsignada} defaultValue={this.state.docente.aulaAsignada} value={aula.idAula}>{aula.nombre}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <ErrorMessage errors={this.state.errors} name="aulaAsignada" />
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button className="btn-block" variant="primary" onClick={this.updateDocente}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Edit;