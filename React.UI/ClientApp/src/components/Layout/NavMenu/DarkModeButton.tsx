import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {FaMoon, FaSun} from "react-icons/all";

export interface Props {
}

export interface State {
    isDarkMode: boolean;
}

class DarkModeButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isDarkMode: false,
        };
    }
    render() {
        return (
            <Button type="button" className="btn btn-danger" onClick={() => {
                this.setState({ isDarkMode: !this.state.isDarkMode})
                localStorage.setItem("TYPE_OF_THEME", this.state.isDarkMode ? "dark" : "light")
            }}>
                {this.state.isDarkMode ? <FaSun/> : <FaMoon/>}
            </Button>
        )
    }
}

export default DarkModeButton;