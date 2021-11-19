import { useHistory } from 'react-router-dom';
import {Container, Navbar} from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import "./NavMenu.css";
import DarkModeButton from "./DarkModeButton";
import {Constants} from "../../../Constants";

const NavMenu = () => {
    const history = useHistory();
    const goTo = (path: string) => history.push(path);

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="danger" variant="dark">
                <Container>
                    <button className="unset">
                        <Navbar.Brand onClick={() => goTo("/home")}>{Constants.Title}</Navbar.Brand>
                    </button>
                    <DarkModeButton />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Navbar.Text>
                            Inicio sesión: <button className="unset" onClick={() => goTo("/home")}>
                                {sessionStorage.getItem('usuario') ?? "Nadie"}
                            </button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                    
                    <LogoutButton />
                </Container>
            </Navbar>
        </div>
    );
}

export default NavMenu;