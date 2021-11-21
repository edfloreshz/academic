import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Tutores from '../../../../img/tutores.svg';
import Alumnos from '../../../../img/alumnos.svg';
import Docentes from '../../../../img/docente.svg';
import Pagos from '../../../../img/pagos.svg';
import Asistencia from '../../../../img/asistencia.svg';
import Constancias from '../../../../img/constancias.svg';
import {IoMdSchool} from "react-icons/io";
import {FaChalkboardTeacher, FaMoneyBill, FaUserTie, FaClipboardList} from "react-icons/fa";
import {BsDownload} from "react-icons/bs";
import Section from "./Section/Section";
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
                            <h1><b>Sistema de Administración</b></h1>
                            <h6><b>{this.props.title}</b></h6>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div className="displayGrid">
                            <Section title="Alumnos" logo={IoMdSchool} image={Alumnos} path="/alumnos" description="Aqui puede administrar a los alumnos"  />
                            <Section title="Tutores" logo={FaUserTie} image={Tutores} path="/tutores" description="" />
                            <Section title="Docentes" logo={FaChalkboardTeacher} image={Docentes} path="/docentes" description="" />
                            <Section title="Pagos" logo={FaMoneyBill} image={Pagos} path="/pagos" description="" />
                            <Section title="Asistencia" logo={FaClipboardList} image={Asistencia} path="/asistencia" description="" />
                            <Section title="Constancias" logo={BsDownload} image={Constancias} path="/constancias" description="" />
                        </div>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

export default Home;