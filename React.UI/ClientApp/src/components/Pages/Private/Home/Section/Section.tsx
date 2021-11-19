import React, {Component} from 'react';
import {Button, Card } from 'react-bootstrap';
import { IconType } from 'react-icons';
import { FaArrowCircleRight } from 'react-icons/fa';
import Alumnos from "../../../../img/alumnos.svg";

interface Props {
    title: string;
    logo: IconType;
    path: string;
}

class Section extends Component<Props> {
    render() {
        const { title, logo, path } = this.props;
        return (
            <div className="gridItem">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            <h3>
                                {logo} <b>{title}</b>
                            </h3>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img src={Alumnos} />
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="danger">
                            Abrir <FaArrowCircleRight/>
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Section;