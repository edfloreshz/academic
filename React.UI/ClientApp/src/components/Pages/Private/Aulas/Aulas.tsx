import React, {Component} from 'react';
import {ILoading, IPagination} from "../../../../App";
import {RequestType, send} from "../../../../utils/RequestManager";
import {IAula} from "../../../../models/Aula";
import {Button, Card, Col, Pagination, Row, Table} from "react-bootstrap";
import Spinning from "../../../Layout/Navigation/Spinning/Spinning";
import {FaCube, FaEdit} from "react-icons/fa";
import Edit from "./Modals/Edit";
import Add from "./Modals/Add";

export interface Props {

}

export interface State extends ILoading, IPagination {
    aulas: IAula[],
    aula: IAula,
    showEdit: boolean,
    showAdd: boolean,
}

class Aulas extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            aulas: [],
            aula: {} as IAula,
            totalPaginas: 0,
            paginaActual: 0,
            showEdit: false,
            showAdd: false,
            loading: true
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    changePage(index: number) {
        this.setState({ paginaActual: index })
    }

    handleShow(aula?: IAula) {
        if (typeof aula === 'undefined') {
            this.setState({ showAdd: true })
        }
        else {
            this.setState({ aula })
            this.setState({ showEdit: true })
        }
    }

    async handleClose() {
        this.setState({ showEdit: false })
        this.setState({ showAdd: false })
        await this.updateState();
    }

    async updateState() {
        this.setState({ aulas: await send<IAula[]>(RequestType.GET, "Aula")})
    }

    async componentDidMount() {
        this.setState({
            aulas: await send<IAula[]>(RequestType.GET, "Aula").finally(() => this.setState({loading: false}))
        })
    }
    
    render() {
        const items = [];
        const { startIndex, endIndex } = (this.state.paginaActual === 0)
            ? { startIndex: 0, endIndex: 6 }
            : { startIndex: this.state.paginaActual * 6, endIndex: this.state.paginaActual * 6 + 6 };
        for (let i = 0; i < this.state.totalPaginas; i++) {
            items.push(<Pagination.Item key={i} active={i === this.state.paginaActual} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>);
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
                            Pagina {this.state.paginaActual + 1}
                        </Col>
                        <Col style={{ textAlign: "center" }}>
                            Aulas
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
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.aulas.slice(startIndex, endIndex).map((aula) => (
                                        <tr key={aula.idAula}>
                                            <td><FaCube/></td>
                                            <td>{aula.nombre}</td>
                                            <td>
                                                <Button className="btn-block" variant="warning" onClick={() => this.handleShow(aula)}><FaEdit /></Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                {this.state.showEdit && <Edit show={this.state.showEdit} aula={this.state.aula} handleClose={this.handleClose} />}
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
        );
    }
}

export default Aulas;