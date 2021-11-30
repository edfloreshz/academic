import { useHistory } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { BsCardChecklist, BsDownload } from "react-icons/bs";
import {FaChalkboardTeacher, FaMoneyBill, FaUserTie, FaClipboardList, FaCube} from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import "./Menu.css"

const Menu = () => {
    const history = useHistory();
    const goTo = (path: string) => history.push(path);
    if (sessionStorage.getItem("administrador") === "true") {
        return (
            <div>
                <Navbar collapseOnSelect expand="sm" bg="danger" variant="dark">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/alumnos")}><IoMdSchool /> Alumnos</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/tutores")}><FaUserTie /> Tutores</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/docentes")}><FaChalkboardTeacher /> Docentes</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/pagos")}><FaMoneyBill /> Pagos</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/aulas")}><FaCube /> Aulas</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/asistencia")}><FaClipboardList /> Asistencia</Button>
                            <Button id="menu-btn" className="btn-block" variant="danger" onClick={() => goTo("/constancias")}><BsDownload /> Constancias</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar collapseOnSelect expand="sm" bg="danger" variant="dark">
                    <Container>
                        {/* <Navbar.Brand href="/home">Areas</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Button className="btn-block" variant="danger" onClick={() => goTo("/asistencia")}><BsCardChecklist /> Asistencia</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Menu;