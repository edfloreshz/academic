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
            <Navbar collapseOnSelect expand="sm" variant="dark" className="top-bar">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="responsive-topbar">
                        <div id="brand">
                            <Navbar.Brand onClick={() => goTo("/home")}>{Constants.Title}</Navbar.Brand>
                            <Navbar.Text>
                                {sessionStorage.getItem('usuario') ?? "Debe iniciar sesión"}
                            </Navbar.Text>
                        </div>
                        <div id="controls">
                            <DarkModeButton id="dark-mode-btn" theme={props.theme} switchTheme={props.switchTheme} />
                            <LogoutButton />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default TopBar;