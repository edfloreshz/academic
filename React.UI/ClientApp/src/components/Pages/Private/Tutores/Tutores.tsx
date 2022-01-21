import React, { Component } from "react";
import { Card, Button, Col, Row, Table, Pagination } from "react-bootstrap";
import { ITutor } from '../../../../models/Tutor';
import Edit from './Modals/Edit';
import Add from './Modals/Add';
import "./Tutores.css"
import { FaEdit, FaUser } from "react-icons/fa";
import Spinning from "../../../Layout/Navigation/Spinning/Spinning";
import { ILoading, IPagination } from "../../../../App";
import {RequestType, send} from "../../../../utils/RequestManager";

export interface Props {

}

export interface State extends ILoading, IPagination {
    tutores: ITutor[],
    tutor: ITutor,
    showEdit: boolean,
    showAdd: boolean,
}
class Tutores extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            tutores: [],
            tutor: {} as ITutor,
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

    handleShow(tutor?: ITutor) {
        if (typeof tutor === 'undefined') {
            this.setState({ showAdd: true })
        }
        else {
            this.setState({ tutor })
            this.setState({ showEdit: true })
        }
    }

    handleClose() {
        this.setState({ showEdit: false })
        this.setState({ showAdd: false })
        this.updateState();
    }

    async updateState() {
        this.setState({ tutores: await send<ITutor[]>(RequestType.GET, "Tutor") })
    }

    async componentDidMount() {
        this.setState({ tutores: await send<ITutor[]>(RequestType.GET, "Tutor").finally(() => this.setState({ loading: false })) });
        this.setState({ totalPaginas: Math.ceil(this.state.tutores.length / 6) })
    }

    render() {
        const items = [];
        const { startIndex, endIndex } = (this.state.paginaActual === 0)
            ? { startIndex: 0, endIndex: 6 }
            : { startIndex: this.state.paginaActual * 6, endIndex: this.state.paginaActual * 6 + 6 };
        for (let i = 0; i < this.state.totalPaginas; i++) {
            items.push(<Pagination.Item key={i} active={i === this.state.paginaActual} activeLabel={" ⦿"} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>);
        }
        if (this.state.loading) {
            return (
                <Spinning />
            )
        }
        return (
            <Card>
                <Card.Header as="h5">
                    <Row>
                        <Col>
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            Tutores
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
                                        <th>Tutor</th>
                                        <th>Estatus</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tutores.slice(startIndex, endIndex).map((tutor) => (
                                            <tr key={tutor.idTutor}>
                                                <td><FaUser></FaUser></td>
                                                <td>{tutor.nombres} {tutor.apellidoPaterno} {tutor.apellidoMaterno}</td>
                                                <td>{tutor.activo ? "Activo" : "Inactivo"}</td>
                                                <td>
                                                    <Button className="btn-block" variant="warning" onClick={() => this.handleShow(tutor)}><FaEdit /></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {this.state.showEdit && <Edit show={this.state.showEdit} tutor={this.state.tutor} handleClose={this.handleClose} />}
                            </Table>
                        </div>
                    }
                </Card.Body>
                <Card.Footer >
                    <Pagination className="center red" size="lg">
                        {items}
                    </Pagination>
                </Card.Footer>
            </Card >
        )
    }
}

export default Tutores;