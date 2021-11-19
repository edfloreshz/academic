import React, { Component } from 'react'
import { Row } from 'react-bootstrap';

export default class Spinning extends Component {
    render() {
        return (
            <Row className="center"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></Row>
        )
    }
}
