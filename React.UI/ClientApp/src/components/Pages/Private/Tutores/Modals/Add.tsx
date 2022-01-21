import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {RequestType, send} from "../../../../../utils/RequestManager";
import {validate} from "../../../../../utils/ValidationManager";
import {setKeyValue} from "../../../../../models/Functions";
import {ITutor, tutorSchema} from "../../../../../models/Tutor";
import {ZodIssue} from "zod";
import Swal from "sweetalert2";
import ErrorMessage from "../../Error/ErrorMessage";

export interface Props {
    show: boolean,
    handleClose: () => void
}

export interface State {
    tutor: ITutor,
    errors: Array<ZodIssue>,
}

class Add extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            tutor: {
                idTutor: 0,
                nombres: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                numeroCelular: "",
                email: "",
                calle: "",
                numero: 0,
                colonia: "",
                localidad: "",
                estado: "",
                pais: "",
                cp: 0,
                activo: true,
            } as ITutor,
            errors: []
        }
        this.saveTutor = this.saveTutor.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        let tutor = setKeyValue(this.state.tutor, event.currentTarget.name as keyof ITutor, event.currentTarget.value);
        this.setState({
            errors: await validate(event.currentTarget.name, tutor, tutorSchema)
        })
        this.setState({ tutor })
    }

    async saveTutor() {
        if (this.state.errors.length === 0) {
            await send(RequestType.POST, "Tutor", this.state.tutor, null, "", this.props.handleClose);
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
                        <Modal.Title>Agregar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nombres</Form.Label>
                            <Form.Control required value={this.state.tutor.nombres} onChange={async (event: any) => await this.handleInputChange(event)} name="nombres" type="text" placeholder="Nombres" />
                            <ErrorMessage errors={this.state.errors} name="nombres"/>
                        </Form.Group>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Apellido paterno</Form.Label>
                                    <Form.Control required value={this.state.tutor.apellidoPaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoPaterno" type="text" placeholder="Apellido paterno" />
                                    <ErrorMessage errors={this.state.errors} name="apellidoPaterno"/>
                                </Form.Group>
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicSecondLastName">
                                    <Form.Label>Apellido materno</Form.Label>
                                    <Form.Control required value={this.state.tutor.apellidoMaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoMaterno" type="text" placeholder="Apellido materno" />                                    <ErrorMessage errors={this.state.errors} name="apellidoPaterno"/>
                                    <ErrorMessage errors={this.state.errors} name="apellidoMaterno"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formBasicNumeroCelular">
                            <Form.Label>Numero celular</Form.Label>
                            <Form.Control type="text" required value={this.state.tutor.numeroCelular} onChange={async (event: any) => await this.handleInputChange(event)} name="numeroCelular" placeholder="Numero celular" />
                            <ErrorMessage errors={this.state.errors} name="numeroCelular"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required value={this.state.tutor.email} onChange={async (event: any) => await this.handleInputChange(event)} name="email" type="text" placeholder="Email" />
                            <ErrorMessage errors={this.state.errors} name="email"/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicCalle">
                                    <Form.Label>Calle</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.calle} onChange={async (event: any) => await this.handleInputChange(event)} name="calle" placeholder="Calle" />
                                    <ErrorMessage errors={this.state.errors} name="calle"/>
                                </Form.Group>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="4">
                                <Form.Group controlId="formBasicNumero">
                                    <Form.Label>Numero</Form.Label>
                                    <Form.Control type="number" required value={this.state.tutor.numero} onChange={async (event: any) => await this.handleInputChange(event)} name="numero" placeholder="Numero" />
                                    <ErrorMessage errors={this.state.errors} name="numero"/>
                                </Form.Group>
                            </Col>
                            <Col sm="12" md="12" lg="8">
                                <Form.Group controlId="formBasicCP">
                                    <Form.Label>Codigo Postal</Form.Label>
                                    <Form.Control type="number" required value={this.state.tutor.cp} onChange={async (event: any) => await this.handleInputChange(event)} name="cp" placeholder="Codigo Postal" />
                                    <ErrorMessage errors={this.state.errors} name="cp"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Colonia</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.colonia} onChange={async (event: any) => await this.handleInputChange(event)} name="colonia" placeholder="Colonia" />
                                    <ErrorMessage errors={this.state.errors} name="colonia"/>
                                </Form.Group>
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicSecondLastName">
                                    <Form.Label>Localidad</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.localidad} onChange={async (event: any) => await this.handleInputChange(event)} name="localidad" placeholder="Localidad" />
                                    <ErrorMessage errors={this.state.errors} name="localidad"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicLastName">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.estado} onChange={async (event: any) => await this.handleInputChange(event)} name="estado" placeholder="Estado" />
                                    <ErrorMessage errors={this.state.errors} name="estado"/>
                                </Form.Group>
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicSecondLastName">
                                    <Form.Label>Pais</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.pais} onChange={async (event: any) => await this.handleInputChange(event)} name="pais" placeholder="Pais" />
                                    <ErrorMessage errors={this.state.errors} name="pais"/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button className="btn-block" variant="warning" type="submit" onClick={this.saveTutor}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Add;

