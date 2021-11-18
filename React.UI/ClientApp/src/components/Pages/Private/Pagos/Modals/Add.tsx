import React, { Component } from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { setKeyValue } from "../../../../../models/Functions";
import { validate } from "../../../../../utils/ValidationManager";
import { RequestType, send } from "../../../../../utils/RequestManager";
import { IAlumno } from "../../../../../models/Alumno";
import { ITutor } from "../../../../../models/Tutor";
import { IPago, pagoSchema } from "../../../../../models/Pago";
import { IConcepto } from '../../../../../models/Concepto';
import { ZodIssue } from "zod";
import Swal from "sweetalert2";
import ErrorMessage from "../../Error/ErrorMessage";

export interface Props {
    show: boolean,
    handleClose: () => void
}

export interface State {
    pago: IPago,
    tutores: ITutor[],
    conceptos: IConcepto[],
    alumnos: IAlumno[],
    errors: Array<ZodIssue>,
}

class Add extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            pago: {
                idPago: 0,
                fecha: new Date(),
                cantidad: 0,
                concepto: 0,
                conceptoNavigation: null,
                comprobanteDePago: "",
                formatoComprobante: "",
                idTutor: 0,
                idTutorNavigation: null,
                idAlumno: 0,
                idAlumnoNavigation: null,
            } as IPago,
            tutores: [] as ITutor[],
            conceptos: [] as IConcepto[],
            alumnos: [] as IAlumno[],
            errors: []
        }
        this.savePago = this.savePago.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchAlumnos = this.fetchAlumnos.bind(this);
    }

    async componentDidMount() {
        this.setState({ tutores: await send<ITutor[]>(RequestType.GET, "Tutor") })
        this.setState({ conceptos: await send<IConcepto[]>(RequestType.GET, "Concepto") })
    }

    async handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        let pago = setKeyValue(this.state.pago, name as keyof IPago, value);
        this.setState({
            errors: await validate(name, pago, pagoSchema)
        })
        this.setState({ pago })
        if (name === "idTutor") {
            await this.fetchAlumnos(value);
        }
    }
    
    // async validateFile() {
    //     const file = document.getElementById("comprobante") as HTMLInputElement;
    //     const fileName = file.value;
    //     const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //     if (fileExtension !== "pdf") {
    //         Swal.fire({
    //             title: "Error",
    //             text: "El archivo debe ser un PDF",
    //             icon: "error",
    //             confirmButtonText: "Aceptar"
    //         })
    //         return false;
    //     }
    //     return true;
    // }
    //
    // async validateFileSize() {
    //     const file = document.getElementById("comprobante") as HTMLInputElement;
    //     if (file == null) return;
    //     const fileSize = file.files[0].size;
    //     if (fileSize > 5242880) {
    //         await Swal.fire({
    //             title: "Error",
    //             text: "El archivo no debe pesar más de 5MB",
    //             icon: "error",
    //             confirmButtonText: "Aceptar"
    //         })
    //         return false;
    //     }
    //     return true;
    // }

    async handleInputFiles(event: React.ChangeEvent<any>) {
        const file = event!.currentTarget!.files![0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        const that = this;
        reader.onload = function () {
            let formatoComprobante = `${reader.result?.toString().split(',')[0]}`;
            let comprobanteDePago = `${reader.result?.toString().split(',')[1]}`;
            let pago = {
                ...that.state.pago,
                comprobanteDePago,
                formatoComprobante
            }
            that.setState({ pago })
        }
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    async fetchAlumnos(id: string) {
        let alumnos = await send<IAlumno[]>(RequestType.GET, "GetAlumnosByTutor", null, parseInt(id));
        this.setState({ alumnos });
    }

    async savePago() {
        if (this.state.errors.length === 0) {
            await send(RequestType.POST, "Pago", this.state.pago, null, "", this.props.handleClose);
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
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Concepto</Form.Label>
                            <Form.Text>
                                <select required key={this.state.pago.idPago} name="concepto" className="form-select" defaultValue={this.state.pago.concepto} onChange={async (event: any) => await this.handleInputChange(event)}>
                                    <option selected value="0">Seleccione un concepto de pago.</option>
                                    {
                                        this.state.conceptos.map((concepto) => {
                                            return (
                                                <option key={concepto.idConcepto} selected={concepto.idConcepto === this.state.pago.concepto} defaultValue={this.state.pago.concepto} value={concepto.idConcepto}>{concepto.concepto}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Form.Text>
                            <ErrorMessage errors={this.state.errors} name="concepto"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicLastName">
                            <Form.Label>Monto</Form.Label>
                            <Form.Control required value={this.state.pago.cantidad} onChange={(event: any) => this.handleInputChange(event)} name="cantidad" type="number" placeholder="Monto" />
                            <ErrorMessage errors={this.state.errors} name="cantidad"/>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Comprobante de pago</Form.Label>
                            <Form.Control className="form-control" type="file" onChange={e => this.handleInputFiles(e)} />
                            <ErrorMessage errors={this.state.errors} name="comprobanteDePago"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Tutor</Form.Label>
                            <Form.Text>
                                <select required key={this.state.pago.idPago} name="idTutor" className="form-select" defaultValue={this.state.pago.idTutor} onChange={async (event: any) => await this.handleInputChange(event)}>
                                    <option selected value="0">Seleccione un tutor</option>
                                    {
                                        this.state.tutores.map((tutor) => {
                                            return (
                                                <option key={tutor.idTutor} selected={tutor.idTutor === this.state.pago.idTutor} defaultValue={this.state.pago.idTutor} value={tutor.idTutor}>{tutor.nombres} {tutor.apellidoPaterno} {tutor.apellidoMaterno}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Form.Text>
                            <ErrorMessage errors={this.state.errors} name="idTutor"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCurp">
                            <Form.Label>Alumno</Form.Label>
                            <Form.Text>
                                <select required key={this.state.pago.idPago} name="idAlumno" className="form-select" defaultValue={this.state.pago.idTutor} onChange={async (event: any) => await this.handleInputChange(event)}>
                                    <option selected value="0">Seleccione un alumno</option>
                                    {
                                        this.state.alumnos.map((alumno) => {
                                            return (
                                                <option key={alumno.idAlumno} selected={alumno.idAlumno === this.state.pago.idAlumno} defaultValue={this.state.pago.idAlumno} value={alumno.idAlumno}>{alumno.nombres} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Form.Text>
                            <ErrorMessage errors={this.state.errors} name="idAlumno"/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <Button className="btn-block" variant="primary" type="submit" onClick={this.savePago}>Guardar</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Add;

