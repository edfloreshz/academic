import React from "react";
import { Button } from "react-bootstrap";
import {FaMoon, FaSun} from "react-icons/all";

function DarkModeButton(props: any)  {
    return (
        <div>
            <Button id="dark-mode-btn" type="button" onClick={props.switchTheme}>
                {props.theme === 'light' ? <FaSun/> : <FaMoon/>}
            </Button>
        </div>
    )
}

export default DarkModeButton;