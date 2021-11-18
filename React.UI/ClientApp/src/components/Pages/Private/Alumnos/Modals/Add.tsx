import { alumnoSchema, IAlumno } from "../../../../../models/Alumno";
import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { setKeyValue } from "../../../../../models/Functions";
import { IAula } from "../../../../../models/Aula";
import { validate } from "../../../../../utils/ValidationManager";
import { send, RequestType } from "../../../../../utils/RequestManager";
import Swal from "sweetalert2";
import { ZodIssue } from "zod";
import ErrorMessage from "../../Error/ErrorMessage";
import { MultiSelect } from "react-multi-select-component";
import { Option } from "react-multi-select-component/dist/types/lib/interfaces";
import { ITutor } from "../../../../../models/Tutor";
import { ITutorAlumno } from "../../../../../models/TutorAlumno";

export interface Props {
    show: boolean,
    handleClose: () => void
}

export interface State {
    alumno: IAlumno,
    aulas: IAula[],
    tutores: Option[],
    errors: Array<ZodIssue>,
    selected: Array<Option>
}

class Add extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumno: {
                idAlumno: 0,
                nombres: "",
                apellidoMaterno: "",
                apellidoPaterno: "",
                curp: "",
                aula: 0,
                activo: true
            } as IAlumno,
            aulas: [],
            tutores: [],
            errors: [],
            selected: []
        }
        this.saveAlumno = this.saveAlumno.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    async componentDidMount() {
        this.setState({
            aulas: await send<IAula[]>(RequestType.GET, "Aula")
        })
        let tutores = await send<ITutor[]>(RequestType.GET, "Tutor");
        this.setState({
            tutores: tutores.map(tutor => {
                return {
                    label: tutor.nombres + " " + tutor.apellidoPaterno + " " + tutor.apellidoMaterno,
                    value: tutor
                }
            })
        })
    }

    async setSelected(selected: Array<Option>) {
        this.setState({ selected })
    }

    async handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        let alumno = setKeyValue(this.state.alumno, event.currentTarget.name as keyof IAlumno, event.currentTarget.value);
        this.setState({
            errors: await validate(event.currentTarget.name, alumno, alumnoSchema)
        })
        this.setState({ alumno })
    }

    async saveAlumno() {
        if (this.state.errors.length === 0) {
            let postedAlumno = await send<IAlumno>(RequestType.POST, "Alumno", this.state.alumno, null, "", this.props.handleClose)
            for (const tutorAlumno of this.state.selected.map(tutor => { return { idTutor: tutor.value.idTutor, idAlumno: postedAlumno.idAlumno } as ITutorAlumno })) {
                await send<ITutorAlumno>(RequestType.POST, "AlumnoTutor", tutorAlumno, null, "", this.props.handleClose, true);
            }
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
                            <Form.Control required value={this.state.alumno.nombres} onChange={async (event: any) => await this.handleInputChange(event)} name="nombres" type="text" placeholder="Nombres" />
                            <ErrorMessage errors={this.state.errors} name="nombres" />
                        </Form.Group>
                        <Row>
                            <Col sm="12" md="12" lg="6"><Form.Group controlId="formBasicLastName">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control required value={this.state.alumno.apellidoPaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoPaterno" type="text" placeholder="Apellido paterno" />
                                <ErrorMessage errors={this.state.errors} name="apellidoPaterno" />
                            </Form.Group></Col>
                            <Col sm="12" md="12" lg="6">
                                <Form.Group controlId="formBasicSecondLastName">
                                    <Form.Label>Apellido materno</Form.Label>
                                    <Form.Control required value={this.state.alumno.apellidoMaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoMaterno" type="text" placeholder="Apellido materno" />
                                    <ErrorMessage errors={this.state.errors} name="apellidoMaterno" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>CURP</Form.Label>
                            <Form.Control required value={this.state.alumno.curp} onChange={async (event: any) => await this.handleInputChange(event)} name="curp" type="text" placeholder="CURP" />
                            <ErrorMessage errors={this.state.errors} name="curp" />
                        </Form.Group>
                        <Form.Group controlId="formBasicTutors">
                            <Form.Label>Tutores</Form.Label>
                            <MultiSelect options={this.state.tutores} onChange={this.setSelected} labelledBy="Select" value={this.state.selected} />
                            <Form.Text>
                                {
                                    this.state.selected.map((tutor) => {
                                        return (
                                            <div key={tutor.value.idTutor}>
                                                <label>{tutor.value.nombres} {tutor.value.apellidoPaterno} {tutor.value.apellidoMaterno}</label>
                                            </div>
                                        )
                                    })
                                }
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicAula">
                            <Form.Label>Aula</Form.Label>
                            <Form.Text>
                                <select required key={this.state.alumno.idAlumno} name="aula" className="form-select" defaultValue={this.state.alumno.aula} onChange={(e: any) => this.handleInputChange(e)}>
                                    <option selected value="0">Seleccione un aula</option>
                                    {
                                        this.state.aulas.map((aula) => {
                                            return (
                                                <option key={aula.idAula} selected={aula.idAula === this.state.alumno.aula} defaultValue={this.state.alumno.aula} value={aula.idAula}>{aula.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Form.Text>
                            <ErrorMessage errors={this.state.errors} name="aula" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button className="btn-block" variant="primary" type="submit" onClick={this.saveAlumno}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Add;

