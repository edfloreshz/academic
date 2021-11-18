import React, { Component } from "react";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import HomePic from '../../../../img/undraw_back_to_school_inwc.png';
import Student from '../../../../img/student.png';
import Teacher from '../../../../img/teacher.png';
import "./Home.css"
import {FaHome, FaSchool} from "react-icons/all";
import {IoMdSchool} from "react-icons/io";
import {FaChalkboardTeacher, FaMoneyBill, FaUserTie} from "react-icons/fa";
import {BsCardChecklist, BsDownload} from "react-icons/bs";

class Home extends Component {
    state = {}
    render() {
        return (
            <div className="Home">
                <Card className="justify-content-center">
                    <Card.Body>
                        <Card.Title>
                            <h1>Sistema de Administracion Creciendo Juntos</h1>
                        </Card.Title>
                        <div className="displayGrid">
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <IoMdSchool /> Alumnos
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={HomePic} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <IoMdSchool /> Alumnos
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={Student} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <FaUserTie /> Tutores
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={Teacher} />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <FaChalkboardTeacher /> Docentes
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={Teacher} />
                                        <Button variant="danger">
                                            Ir a Docentes
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <FaMoneyBill /> Pagos
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={Teacher} />
                                        <Button variant="danger">
                                            Ir a Pagos
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="gridItem">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <h3>
                                                <BsDownload /> Asistencia
                                            </h3>
                                        </Card.Title>
                                        <Card.Img src={Teacher} />
                                        <Button variant="danger">
                                            Ir a Asistencia
                                        </Button>
                                    </Card.Body>
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