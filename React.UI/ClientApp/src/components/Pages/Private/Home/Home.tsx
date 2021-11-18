import React, { Component } from "react";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import Tutores from '../../../../img/undraw_back_to_school_inwc.png';
import Alumnos from '../../../../img/alumnos.svg';
import Docentes from '../../../../img/docente.svg';
import Pagos from '../../../../img/pagos.svg';
import Asistencia from '../../../../img/asistencia.svg';
import Constancias from '../../../../img/constancias.svg';
import {IoMdSchool} from "react-icons/io";
import {FaChalkboardTeacher, FaMoneyBill, FaUserTie, FaClipboardList, FaArrowCircleRight} from "react-icons/fa";
import {BsDownload} from "react-icons/bs";
import "./Home.css"

interface Props {
    title: string;
}

class Home extends Component<Props> {
    state = {}
    render() {
        return (
            <div className="Home">
                <Card className="justify-content-center">
                    <Card.Header>
                        <Card.Title>
                            <h1><b>Sistema de Administracion</b></h1>
                            <h6><b>{this.props.title}</b></h6>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        
                        <div className="displayGrid">
                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <IoMdSchool /> <b>Alumnos</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Alumnos} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <FaUserTie /> <b>Tutores</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Tutores} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>

                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <FaChalkboardTeacher /> <b>Docentes</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Docentes} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <FaMoneyBill /> <b>Pagos</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Pagos} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <FaClipboardList /> <b>Asistencia</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Asistencia} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Header>
                                        <Card.Title>
                                            <h3>
                                                <BsDownload /> <b>Constancias</b>
                                            </h3>
                                        </Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={Constancias} />
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="danger">
                                            Abrir <FaArrowCircleRight/>
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

export default Home;