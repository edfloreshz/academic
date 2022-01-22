import React, {Component} from "react";
import {Button, Card, Col, Pagination, Row} from "react-bootstrap";
import {BsDownload} from "react-icons/bs";
import {IAlumno} from "../../../../../models/Alumno";
import {generatePDFAdeudo, generatePDFConducta} from "../../../../../utils/PDFManager";
import {ILoading, IPagination} from "../../../../../App";
import Spinning from "../../../../Layout/Navigation/Spinning/Spinning";
import "./Alumnos.css"
import {RequestType, send} from "../../../../../utils/RequestManager";
import AlumnosImg from '../../../../../img/alumnos.svg';
import NotFound from "../../../../Layout/NotFound/NotFound";

interface Props { }

export interface State extends ILoading, IPagination {
    alumnos: IAlumno[],
}

class Alumnos extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
            totalPaginas: 0,
            paginaActual: 0,
            loading: true,
        }
        this.changePage = this.changePage.bind(this);
    }

    changePage(index: number) {
        this.setState({ paginaActual: index })
    }
    
    async componentDidMount() {
        let response = await send<IAlumno[]>(RequestType.GET, "Alumno");
        let alumnos = response.map(async (alumno: IAlumno) => {
            alumno.isDeudor = await send<boolean>(RequestType.GET, "Pago/isDeudor", null, `${alumno.idAlumno}`);
            return alumno;
        });
        this.setState({ alumnos: await Promise.all(alumnos), loading: false });
        this.setState({ totalPaginas: Math.ceil(this.state.alumnos.length / 6) })
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
                            Lista de alumnos
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {
                        (this.state.alumnos.length > 0) ?
                            <div className="table-wrapper">
                                <table>
                                    <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>No adeudo</th>
                                        <th>Conducta</th>
                                    </tr>
                                    {this.state.alumnos.slice(startIndex, endIndex).map((alumno: IAlumno) => {
                                        return <tr>
                                            <td>{alumno.idAlumno}</td>
                                            <td>{alumno.nombres} {alumno.apellidoPaterno} {alumno.apellidoMaterno}</td>
                                            <td>
                                                {
                                                    alumno.isDeudor
                                                        ? <Button variant="danger" disabled={true}><BsDownload /></Button>
                                                        : <Button variant="danger" onClick={() => generatePDFAdeudo(alumno)}><BsDownload /></Button>
                                                }
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={() => generatePDFConducta(alumno)}><BsDownload /></Button>
                                            </td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <NotFound
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
        );
    }
}

export default Alumnos;