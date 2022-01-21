import React, {Component} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {IAula} from "../../../../../models/Aula";
import {ITutor, tutorSchema} from "../../../../../models/Tutor";
import {setKeyValue} from "../../../../../models/Functions";
import {validate} from "../../../../../utils/ValidationManager";
import { RequestType, send } from "../../../../../utils/RequestManager";
import {ZodIssue} from "zod";
import ErrorMessage from "../../Error/ErrorMessage";
import Swal from "sweetalert2";

export interface Props {
    show: boolean,
    tutor: ITutor,
    handleClose: () => void
}

export interface State {
    tutor: ITutor,
    aulas: IAula[],
    errors: Array<ZodIssue>,
}

class Edit extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            tutor: this.props.tutor,
            aulas: [],
            errors: []
        }
        this.saveTutor = this.saveTutor.bind(this);
        this.confirmDeactivation = this.confirmDeactivation.bind(this);
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
            await send(RequestType.PUT, "Tutor", this.state.tutor, this.state.tutor.idTutor, "", this.props.handleClose);
        } else {
            await Swal.fire({
                title: 'Error',
                text: 'Revise los campos en rojo',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    async confirmDeactivation() {
        let result = await Swal.fire({
            title: "Esta segura?",
            text: "Se desactivara, es posible volver a reactivar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Desactivar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            await send(RequestType.DELETE, "Tutor", null, this.state.tutor.idTutor, "", this.props.handleClose);
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
                                    <Form.Control type="text" required value={this.state.tutor.numero} onChange={async (event: any) => await this.handleInputChange(event)} name="numero" placeholder="Numero" />
                                    <ErrorMessage errors={this.state.errors} name="numero"/>
                                </Form.Group>
                            </Col>
                            <Col sm="12" md="12" lg="8">
                                <Form.Group controlId="formBasicCP">
                                    <Form.Label>Codigo Postal</Form.Label>
                                    <Form.Control type="text" required value={this.state.tutor.cp} onChange={async (event: any) => await this.handleInputChange(event)} name="cp" placeholder="Codigo Postal" />
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
                                <Button className="btn-block" variant="danger" onClick={async () => await this.confirmDeactivation()}>Desactivar</Button>
                            </Col>
                            <Col>
                                <Button className="btn-block" variant="warning" onClick={this.saveTutor}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Edit;