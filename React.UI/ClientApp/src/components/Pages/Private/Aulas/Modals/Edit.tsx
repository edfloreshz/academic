import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { aulaSchema, IAula } from "../../../../../models/Aula";
import { setKeyValue } from "../../../../../models/Functions";
import { validate } from "../../../../../utils/ValidationManager";
import { RequestType, send } from "../../../../../utils/RequestManager";
import { ZodIssue } from "zod";
import Swal from "sweetalert2";
import ErrorMessage from "../../Error/ErrorMessage";

export interface Props {
    show: boolean,
    aula: IAula,
    handleClose: () => void
}

export interface State {
    aula: IAula,
    errors: Array<ZodIssue>,
}

class Edit extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            aula: this.props.aula,
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
            await send(RequestType.PUT, "Aula", this.state.aula, this.state.aula.idAula, "", this.props.handleClose)
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
                            <Form.Control value={this.state.aula.nombre} onChange={async (event: any) => await this.handleInputChange(event)} name="nombre" type="text" placeholder="Nombres" />
                            <ErrorMessage errors={this.state.errors} name="nombres" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-block" variant="primary" onClick={this.saveAula}>Guardar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Edit;