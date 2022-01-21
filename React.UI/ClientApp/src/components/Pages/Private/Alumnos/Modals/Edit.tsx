import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { IAula } from "../../../../../models/Aula";
import { alumnoSchema, IAlumno } from "../../../../../models/Alumno";
import { setKeyValue } from "../../../../../models/Functions";
import { validate } from "../../../../../utils/ValidationManager";
import { RequestType, send } from "../../../../../utils/RequestManager";
import { ZodIssue } from "zod";
import ErrorMessage from "../../Error/ErrorMessage";
import Swal from "sweetalert2";
import { Option } from "react-multi-select-component/dist/types/lib/interfaces";
import { MultiSelect } from "react-multi-select-component";
import { ITutor } from "../../../../../models/Tutor";
import { ITutorAlumno } from "../../../../../models/TutorAlumno";

export interface Props {
    show: boolean,
    alumno: IAlumno,
    handleClose: () => void
}

export interface State {
    alumno: IAlumno,
    aulas: IAula[],
    tutores: Option[],
    tutorAlumnos: ITutorAlumno[],
    remaining: Option[],
    errors: Array<ZodIssue>,
    selected: Array<Option>,
}

class Edit extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumno: this.props.alumno,
            aulas: [],
            tutores: [],
            tutorAlumnos: [],
            remaining: [],
            errors: [],
            selected: [],
        }
        this.saveAlumno = this.saveAlumno.bind(this);
        this.confirmDeactivation = this.confirmDeactivation.bind(this);
        this.confirmReactivation = this.confirmReactivation.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    async componentDidMount() {
        this.setState({ aulas: await send<IAula[]>(RequestType.GET, "Aula") });
        let response = await send<ITutor[]>(RequestType.GET, "AlumnoTutor", null, this.state.alumno.idAlumno);
        let tutores = response.map(tutor => {
            return {
                label: tutor.nombres + " " + tutor.apellidoPaterno + " " + tutor.apellidoMaterno,
                value: tutor
            }
        })
        this.setState({ tutores })
        this.setState({ selected: tutores })
        this.setState({
            tutorAlumnos: tutores.map(tutor => {
                return {
                    idTutorAlumno: 0,
                    idTutor: tutor.value.idTutor,
                    idAlumno: this.state.alumno.idAlumno
                }
            })
        })
        response = await send<ITutor[]>(RequestType.GET, "GetRemainingTutorsByAlumno", null, this.state.alumno.idAlumno);
        let remaining = response.map(tutor => {
            return {
                label: tutor.nombres + " " + tutor.apellidoPaterno + " " + tutor.apellidoMaterno,
                value: tutor
            }
        })
        await this.setState({ remaining })
    }

    async setSelected(selected: Array<Option>) {
        this.setState({ selected })
        this.setState({
            tutorAlumnos: selected.map(tutor => {
                return {
                    idTutorAlumno: 0,
                    idTutor: tutor.value.idTutor,
                    idAlumno: this.state.alumno.idAlumno
                }
            })
        })
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
            await send(RequestType.PUT, "Alumno", this.state.alumno, this.state.alumno.idAlumno, "", this.props.handleClose)
            for (const tutorAlumno of this.state.selected.map(tutor => { return { idTutor: tutor.value.idTutor, idAlumno: this.state.alumno.idAlumno } as ITutorAlumno })) {
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
            await send(RequestType.DELETE, "Alumno", null, this.state.alumno.idAlumno, "", this.props.handleClose);
        }
    }

    async confirmReactivation() {
        let result = await Swal.fire({
            title: "Esta segura?",
            text: "Se reactivara, es posible volver a desactivar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Reactivar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            await send(RequestType.PUT, "ReactivateAlumno", null, this.state.alumno.idAlumno, "", this.props.handleClose);
        }
    }

    async removeTutor(id: number) {
        let result = await Swal.fire({
            title: "Esta segura?",
            text: "Se eliminara el tutor asignado al alumno.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
            await send(RequestType.DELETE,
                "AlumnoTutor",
                { idTutor: id, idAlumno: this.state.alumno.idAlumno },
                null,
                "");
            this.setState({
                selected: this.state.selected.filter(tutor => tutor.value.idTutor !== id)
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
                            <Form.Control value={this.state.alumno.nombres} onChange={async (event: any) => await this.handleInputChange(event)} name="nombres" type="text" placeholder="Nombres" />
                            <ErrorMessage errors={this.state.errors} name="nombres" />
                        </Form.Group>
                        <Row>
                            <Col sm="12" md="12" lg="6"><Form.Group controlId="formBasicLastName">
                                <Form.Label>Apellido paterno</Form.Label>
                                <Form.Control value={this.state.alumno.apellidoPaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoPaterno" type="text" placeholder="Apellido paterno" />
                                <ErrorMessage errors={this.state.errors} name="apellidoPaterno" />
                            </Form.Group></Col>
                            <Col sm="12" md="12" lg="6"><Form.Group controlId="formBasicSecondLastName">
                                <Form.Label>Apellido materno</Form.Label>
                                <Form.Control value={this.state.alumno.apellidoMaterno} onChange={async (event: any) => await this.handleInputChange(event)} name="apellidoMaterno" type="text" placeholder="Apellido materno" />
                                <ErrorMessage errors={this.state.errors} name="apellidoMaterno" />
                            </Form.Group></Col>
                        </Row>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>CURP</Form.Label>
                            <Form.Control value={this.state.alumno.curp} onChange={async (event: any) => await this.handleInputChange(event)} name="curp" type="text" placeholder="CURP" />
                            <ErrorMessage errors={this.state.errors} name="curp" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Aula</Form.Label>
                            <Form.Text>
                                <select key={this.state.alumno.idAlumno} name="aula" className="form-select" defaultValue={this.state.alumno.aula} onChange={(e: any) => this.handleInputChange(e)}>
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
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Tutores</Form.Label>
                            <MultiSelect options={this.state.remaining} onChange={this.setSelected} labelledBy="Select" value={this.state.selected} />
                            <Form.Text>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.selected.map((tutor) => {
                                                return (
                                                    <tr>
                                                        <td>{tutor.value.nombres} {tutor.value.apellidoPaterno} {tutor.value.apellidoMaterno}</td>
                                                        <td><Button variant="danger" onClick={() => this.removeTutor(tutor.value.idTutor)}>Eliminar</Button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                {
                                    this.state.alumno.activo
                                        ? <Button className="btn-block" variant="danger" onClick={this.confirmDeactivation}>Desactivar</Button>
                                        : <Button className="btn-block" variant="danger" onClick={this.confirmReactivation}>Reactivar</Button>
                                }
                            </Col>
                            <Col>
                                <Button className="btn-block" variant="warning" onClick={this.saveAlumno}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Edit;