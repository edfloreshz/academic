import React, { Component } from 'react';
import { aulaSchema, IAula} from "../../../../../models/Aula";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { setKeyValue } from "../../../../../models/Functions";
import { validate } from "../../../../../utils/ValidationManager";
import { send, RequestType } from "../../../../../utils/RequestManager";
import Swal from "sweetalert2";
import { ZodIssue } from "zod";
import ErrorMessage from "../../Error/ErrorMessage";

export interface Props {
    show: boolean,
    handleClose: () => void
}

export interface State {
    aula: IAula,
    errors: Array<ZodIssue>,
}

class Add extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            aula: {
                idAula: 0,
                nombre: "",
            } as IAula,
            errors: [],
        }
        this.saveAula = this.saveAula.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        let aula = setKeyValue(this.state.aula, event.currentTarget.name as keyof IAula, event.currentTarget.value);
        this.setState({
            errors: await validate(event.currentTarget.name, aula, aulaSchema)
        })
        this.setState({ aula })
    }

    async saveAula() {
        if (this.state.errors.length === 0) {
            await send<IAula>(RequestType.POST, "Aula", this.state.aula, null, "", this.props.handleClose)
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
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control required value={this.state.aula.nombre} onChange={async (event: any) => await this.handleInputChange(event)} name="nombre" type="text" placeholder="Nombre del aula" />
                            <ErrorMessage errors={this.state.errors} name="nombre" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button className="btn-block" variant="warning" type="submit" onClick={this.saveAula}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Add;

