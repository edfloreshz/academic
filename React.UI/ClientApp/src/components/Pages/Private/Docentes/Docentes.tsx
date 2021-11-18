import React, { Component } from "react";
import { Card, Button, Col, Row, Table, Pagination } from "react-bootstrap";
import {RequestType, send} from "../../../../utils/RequestManager";
import { IDocente } from '../../../../models/Docente';
import Edit from './Modals/Edit';
import Add from './Modals/Add';
import "./Docentes.css"
import { FaChalkboardTeacher, FaEdit, FaList } from 'react-icons/fa';
import Spinning from '../../../Layout/Spinning';
import ListaAlumnos from "./Modals/ListaAlumnos";
import { ILoading, IPagination } from "../../../../App";

export interface Props {

}

export interface State extends ILoading, IPagination {
    docentes: IDocente[],
    docente: IDocente,
    listId: number,
    showEdit: boolean,
    showList: boolean,
    showAdd: boolean,
}

class Docentes extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            docentes: [],
            docente: {} as IDocente,
            listId: 0,
            totalPaginas: 0,
            paginaActual: 0,
            showEdit: false,
            showList: false,
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

    handleShow(docente?: any, id?: number) {
        if (typeof docente === 'undefined') {
            this.setState({ showAdd: true })
        }
        else if (docente === "list") {
            if (typeof id !== 'undefined') {
                this.setState({ listId: id })
            }
            this.setState({ showList: true })
        }
        else {
            this.setState({ docente: docente })
            this.setState({ showEdit: true })
        }
    }

    handleClose() {
        this.setState({ showEdit: false })
        this.setState({ showList: false })
        this.setState({ showAdd: false })
        this.updateState();
    }

    async updateState() {
        this.setState({ docentes: await send<IDocente[]>(RequestType.GET, "Docente") })
    }

    async componentDidMount() {
        this.setState({ docentes: await send<IDocente[]>(RequestType.GET, "Docente").finally(() => this.setState({ loading: false })) })
        this.setState({ totalPaginas: Math.ceil(this.state.docentes.length / 6) })
    }

    render() {
        const items = [];
        const { startIndex, endIndex } = (this.state.paginaActual === 0)
            ? { startIndex: 0, endIndex: 6 }
            : { startIndex: this.state.paginaActual * 6, endIndex: this.state.paginaActual * 6 + 6 };
        for (let i = 0; i < this.state.totalPaginas; i++) {
            items.push(<Pagination.Item key={i} active={i === this.state.paginaActual} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>);
        }
        if (this.state.loading) { return (<Spinning />) }
        return (
            <Card>
                <Card.Header as="h5">
                    <Row>
                        <Col>
                            Pagina {this.state.paginaActual + 1}
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            Docentes
                        </Col>
                        <Col>
                            <Button className="headerButton btn-sm" variant="warning" onClick={() => this.handleShow()}>Agregar</Button>
                        </Col>
                    </Row>
                </Card.Header>
                {this.state.showAdd && <Add show={this.state.showAdd} handleClose={this.handleClose} />}
                <Card.Body>
                    {
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Docente</th>
                                        <th>Estatus</th>
                                        <th>Editar</th>
                                        <th>Lista de alumnos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.docentes.slice(startIndex, endIndex).map((docente) => (
                                            <tr key={docente.idDocente}>
                                                <td><FaChalkboardTeacher></FaChalkboardTeacher></td>
                                                <td>{docente.idDocente}</td>
                                                <td>{docente.nombres} {docente.apellidoPaterno} {docente.apellidoMaterno}</td>
                                                <td>{docente.activo ? "Activo" : "Inactivo"}</td>
                                                <td width="20%">
                                                    <Button className="btn-block" variant="warning" onClick={() => this.handleShow(docente)}><FaEdit /></Button>
                                                </td>
                                                <td width="20%">
                                                    <Button className="btn-block" variant="info" onClick={() => this.handleShow("list", docente.idDocente)}><FaList /></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {this.state.showEdit && <Edit show={this.state.showEdit} docente={this.state.docente} handleClose={this.handleClose} />}
                                {this.state.showList && <ListaAlumnos idDocente={this.state.listId} show={this.state.showList} handleClose={this.handleClose} />}
                            </Table>
                        </div>
                    }
                </Card.Body>
                <Card.Footer>
                    <Pagination className="center red" size="lg">
                        {items}
                    </Pagination>
                </Card.Footer>
            </Card >
        )
    }
}

export default Docentes;