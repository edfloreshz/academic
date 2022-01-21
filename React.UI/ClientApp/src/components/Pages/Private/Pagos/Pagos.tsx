import React, {Component} from 'react'
import {IPago} from '../../../../models/Pago'
import {Button, Card, Col, Pagination, Row, Table} from 'react-bootstrap';
import Add from './Modals/Add';
import {RequestType, send} from '../../../../utils/RequestManager';
import {FaMoneyBill} from 'react-icons/fa';
import Spinning from "../../../Layout/Navigation/Spinning/Spinning";
import {ILoading, IPagination} from '../../../../App';
import {generateReceipt} from "../../../../utils/PDFManager";
import NotFound from "../../../Layout/NotFound/NotFound";
import PagosImg from '../../../../img/pagos.svg';


export interface Props {

}

export interface State extends ILoading, IPagination {
    pagos: IPago[],
    pago: IPago,
    showAdd: boolean
}

export default class Pagos extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            pagos: [],
            pago: {} as IPago,
            totalPaginas: 0,
            paginaActual: 0,
            showAdd: false,
            loading: true
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.changePage = this.changePage.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    changePage(index: number) {
        this.setState({ paginaActual: index })
    }

    async getComprobante(id: number) {
        const data = await send<string>(RequestType.GET, "Comprobante", null, id)
        window.open(data)
    }

    handleShow() {
        this.setState({ showAdd: true })
    }

    async handleClose() {
        this.setState({ showAdd: false })
        await this.updateState()
    }

    async updateState() {
        this.setState({ pagos: await send<IPago[]>(RequestType.GET, "Pago").finally(() => this.setState({ loading: false })) })
        this.setState({ totalPaginas: Math.ceil(this.state.pagos.length / 6) })
    }

    async componentDidMount() {
        await this.updateState()
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
            <div>
                <Card>
                    <Card.Header as="h5">
                        <div className="flex-titlebar">
                            Control de Pagos
                            <Button className="btn-sm" variant="warning" onClick={this.handleShow}>Agregar</Button>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {
                            (this.state.pagos.length > 0) ?
                            <div className="table-responsive table-responsive-sm">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Fecha</th>
                                            <th>Tutor</th>
                                            <th>Alumno</th>
                                            <th>Cantidad</th>
                                            <th>Concepto</th>
                                            <th>Recibo</th>
                                            <th>Comprobante</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.pagos.slice(startIndex, endIndex).map((pago) => (
                                                <tr key={pago.idPago}>
                                                    <td><FaMoneyBill></FaMoneyBill></td>
                                                    <td>{pago.fecha.toString().slice(0, 10)}</td>
                                                    <td>{pago.idTutorNavigation?.nombres} {pago.idTutorNavigation?.apellidoPaterno} {pago.idTutorNavigation?.apellidoMaterno}</td>
                                                    <td>{pago.idAlumnoNavigation?.nombres} {pago.idAlumnoNavigation?.apellidoPaterno} {pago.idAlumnoNavigation?.apellidoMaterno}</td>
                                                    <td>${pago.cantidad}</td>
                                                    <td>{pago.conceptoNavigation?.concepto}</td>
                                                    <td>
                                                        <Button variant="warning" onClick={async () => await generateReceipt(pago)} target="_blank">Ver</Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="info" onClick={async () => await this.getComprobante(pago.idPago)} target="_blank">Ver</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            : <NotFound
                                    title="Lista de pagos"
                                    warning="No se encontraron pagos"
                                    recommendation="Agregue nuevos pagos con el boton amarillo"
                                    picture={PagosImg}
                                />
                        }
                    </Card.Body>
                    <Card.Footer>
                        <Pagination className="center red" size="lg">
                            {items}
                        </Pagination>
                    </Card.Footer>
                </Card>
                {this.state.showAdd && <Add show={this.state.showAdd} handleClose={this.handleClose} />}
            </div>
        )
    }
}
