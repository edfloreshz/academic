import React, { Component } from "react";
import "./NotFound.css"
import {Button, Card, Col, Row} from "react-bootstrap";
import Asistencia from "../../../img/alumnos.svg";

interface Props {
    title: string,
    warning: string,
    recommendation: string,
    picture: string
}

class NotFound extends Component<Props> {
    render() {
        return (
                <div className="center not-found-container">
                    <img src={this.props.picture} />
                    <h4>
                        <b>{this.props.warning}</b>
                    </h4>
                    <h5>
                        {this.props.recommendation}
                    </h5>
                </div>
        );
    }
}

export default NotFound;