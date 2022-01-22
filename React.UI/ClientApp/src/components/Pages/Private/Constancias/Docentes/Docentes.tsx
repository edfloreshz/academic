import React, { Component } from "react";
import { BsDownload } from "react-icons/bs";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { generatePDFRecomendacion } from "../../../../../utils/PDFManager";
import { ILoading, IPagination } from "../../../../../App";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { IDocente } from "../../../../../models/Docente";
import Spinning from "../../../../Layout/Navigation/Spinning/Spinning";
import "./Docentes.css"
import {RequestType, send} from "../../../../../utils/RequestManager";
import TutoresImg from "../../../../../img/tutores.svg";
import NotFound from "../../../../Layout/NotFound/NotFound";

interface Props { }

export interface State extends ILoading, IPagination {
    docentes: IDocente[],
    startDate: Date | null,
    endDate: Date | null,
}

class Docentes extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            docentes: [],
            startDate: null,
            endDate: null,
            totalPaginas: 0,
            paginaActual: 0,
            loading: true,
        }
        this.changePage = this.changePage.bind(this);
        this.handleDateEvent = this.handleDateEvent.bind(this);
    }

    changePage(index: number) {
        this.setState({ paginaActual: index })
    }

    handleDateEvent(event: any, picker: any) {
        this.setState({ startDate: picker.startDate._d });
        this.setState({ endDate: picker.endDate._d });
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
            items.push(<Pagination.Item key={i} active={i === this.state.paginaActual} activeLabel={" "} onClick={() => this.changePage(i)}>{i + 1}</Pagination.Item>);
        }
        if (this.state.loading) { return (<Spinning />) }
        let startDate = this.state.startDate ? this.state.startDate : new Date();
        let endDate = this.state.endDate ? this.state.endDate : new Date();
        if (this.state.docentes.length > 0) {} else {}
        return (
            <Card>
                <Card.Header as="h5">
                    <Row>
                        <Col>
                            Lista de docentes
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {
                        (this.state.docentes.length > 0)
                        ? <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Periodo trabajado</th>
                                        <th>Recomendación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.docentes.slice(startIndex, endIndex).map((docente: IDocente) => 
                                        <tr>
                                            <td>{docente.idDocente}</td>
                                            <td>{docente.nombres} {docente.apellidoPaterno} {docente.apellidoMaterno}</td>
                                            <td width="25%">
                                                <DateRangePicker onEvent={this.handleDateEvent}
                                                                 initialSettings={{ startDate: '1/1/2020', endDate: '3/1/2021' }}
                                                >
                                                    <input id="datePicker" type="text" className="form-control" />
                                                </DateRangePicker>
                                            </td>
                                            <td>
                                                {
                                                    (this.state.startDate != null && this.state.endDate != null)
                                                        ? <Button className="btn-info" onClick={() => generatePDFRecomendacion(docente, startDate, endDate)}><BsDownload /></Button>
                                                        : <Button disabled={true} className="btn-info"><BsDownload /></Button>
                                                }

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <NotFound
                            title="Lista de docentes"
                            warning="No se encontraron docentes"
                            recommendation="Agregue nuevos docentes con el boton amarillo"
                            picture={TutoresImg}
                        />
                    }
                </Card.Body>
                <Card.Footer >
                    <Pagination className="center" size="lg">
                        {items}
                    </Pagination>
                </Card.Footer>
            </Card>
        );
    }
}

export default Docentes;