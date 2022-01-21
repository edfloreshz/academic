import { useHistory } from 'react-router-dom';
import {Container, Navbar} from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import DarkModeButton from "./DarkModeButton";
import {Constants} from "../../../../Constants";
import "./TopBar.css";

const TopBar = (props: any) => {
    const history = useHistory();
    const goTo = (path: string) => history.push(path);

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" className="top-bar navbar-dark">
                <Container>
                    <button className="unset">
                        <Navbar.Brand onClick={() => goTo("/home")}>{Constants.Title}</Navbar.Brand>
                    </button>
                    <DarkModeButton theme={props.theme} switchTheme={props.switchTheme} />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Navbar.Text>
                            {sessionStorage.getItem('usuario') ?? "Debe iniciar sesión"}
                        </Navbar.Text>
                    </Navbar.Collapse>
                    <LogoutButton />
                </Container>
            </Navbar>
        </div>
    );
}

export default TopBar;