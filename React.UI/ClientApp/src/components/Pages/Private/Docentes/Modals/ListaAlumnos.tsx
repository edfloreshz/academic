import React, { Component } from 'react'
import { Table, Modal } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { IAlumno } from '../../../../../models/Alumno'
import { RequestType, send } from '../../../../../utils/RequestManager';
import Spinning from "../../../../Layout/Navigation/Spinning/Spinning";

export interface Props {
    show: boolean,
    idDocente: number,
    handleClose: () => void
}

export interface State {
    alumnos: IAlumno[],
}

export default class ListaAlumnos extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
        }
    }

    async componentDidMount() {
        this.setState({
            alumnos: await send<IAlumno[]>(
                RequestType.GET,
                "GetAlumnosAulaDocente",
                null,
                this.props.idDocente,
                "?isAsistencia=false"
            )
        })
    }
    render() {
        return (
            <>
                
                <Modal show={this.props.show} onHide={this.props.handleClose} className={"modal"}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lista de alumnos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            !this.state.alumnos.length ? <Spinning /> :
                                <div>
                                    <div className="table-responsive">
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Alumno</th>
                                                    <th>Aula</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.alumnos.map((alumno) => (
                                                        <tr key={alumno.idAlumno}>
                                                            <td><FaUser></FaUser></td>
                                                            <td>{alumno.nombres} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</td>
                                                            <td>{alumno.aulaNavigation?.nombre}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                        }
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
