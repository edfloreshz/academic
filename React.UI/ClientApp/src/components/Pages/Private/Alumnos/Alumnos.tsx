import React, { Component } from "react";
import { Card, Button,  Pagination } from "react-bootstrap";
import {send, RequestType} from "../../../../utils/RequestManager";
import { IAlumno } from '../../../../models/Alumno';
import Edit from './Modals/Edit';
import Add from './Modals/Add';
import { FaEdit, FaUser } from "react-icons/fa";
import Spinning from "../../../Layout/Navigation/Spinning/Spinning";
import { ILoading, IPagination } from "../../../../App";
import NotFound from "../../../Layout/NotFound/NotFound";
import AlumnosImg from '../../../../img/alumnos.svg';
import "./Alumnos.css"
import "gridjs/dist/theme/mermaid.css";

export interface Props {

}

export interface State extends ILoading, IPagination {
    alumnos: IAlumno[],
    alumno: IAlumno,
    showEdit: boolean,
    showAdd: boolean,
}

class Alumnos extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
            alumno: {} as IAlumno,
            totalPaginas: 0,
            paginaActual: 0,
            showEdit: false,
            showAdd: false,
            loading: true
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    changePage(index: number) {
        this.setState({ paginaActual: index })
    }

    handleShow(id?: string) {
        if (typeof id === 'undefined') {
            this.setState({ showAdd: true })
        }
        else {
            this.setState({
                alumno: this.state.alumnos.filter(a => a.idAlumno.toString() === id)[0],
                showEdit: true
            })
        }
    }

    async handleClose() {
        this.setState({ showEdit: false })
        this.setState({ showAdd: false })
        await this.updateState();
    }

    async updateState() {
        this.setState({ alumnos: await send<IAlumno[]>(RequestType.GET, "Alumno") })
    }

    async componentDidMount() {
        this.setState(
            { 
                alumnos: await send<IAlumno[]>(RequestType.GET, "Alumno")
                    .finally(() => this.setState({ loading: false })),
            });
        this.setState({ totalPaginas: Math.ceil(this.state.alumnos.length / 6) })
    }

    render() {
        const items = [];
        const { startIndex, endIndex } = (this.state.paginaActual === 0)
            ? { startIndex: 0, endIndex: 6 }
            : { startIndex: this.state.paginaActual * 6, endIndex: this.state.paginaActual * 6 + 6 };
        for (let i = 0; i < this.state.totalPaginas; i++) {
            items.push(<Pagination.Item key={i} active={i === this.state.paginaActual} activeLabel={" "} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>);
        }
        if (this.state.loading) {
            return (
                <Spinning />
            )
        }
        return (
            <div>
                <Card>
                    <Card.Header as="h5">
                        <div className="flex-titlebar">
                            Alumnos
                            <Button className="btn-sm" variant="warning" onClick={() => this.handleShow()}>Agregar</Button>
                        </div>
                    </Card.Header>
                    {this.state.showAdd && <Add show={this.state.showAdd} handleClose={this.handleClose} />}
                    <Card.Body>
                            
                        {
                            (this.state.alumnos.length > 0)
                                ? <div className="table-wrapper">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Alumno</th>
                                            <th>CURP</th>
                                            <th>Aula</th>
                                            <th>Estatus</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.alumnos.slice(startIndex, endIndex).map((alumno) => (
                                                <tr key={alumno.idAlumno}>
                                                    <td><FaUser/></td>
                                                    <td>{alumno.nombres} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</td>
                                                    <td>{alumno.curp}</td>
                                                    <td>{alumno.aulaNavigation?.nombre}</td>
                                                    <td>{alumno.activo ? "Activo" : "Inactivo"}</td>
                                                    <td>
                                                        <Button className="btn-block" variant="warning" onClick={() => this.handleShow(alumno.idAlumno.toString())}><FaEdit /></Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    {this.state.showEdit && <Edit show={this.state.showEdit} alumno={this.state.alumno} handleClose={this.handleClose} />}
                                </div>
                                : <NotFound
                                    title="Lista de alumnos"
                                    warning="No se encontraron alumnos"
                                    recommendation="Agregue nuevos alumnos con el boton amarillo"
                                    picture={AlumnosImg}
                                />
                        }                                        

                    </Card.Body>
                    <Card.Footer >
                        <Pagination className="center red" size="lg">
                            {items}
                        </Pagination>
                    </Card.Footer>
                </Card>
                
            </div>
        )
    }
}

export default Alumnos;