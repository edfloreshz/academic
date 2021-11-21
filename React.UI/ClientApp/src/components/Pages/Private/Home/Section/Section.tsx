import React, {Component} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import { IconType } from 'react-icons';
import { FaArrowCircleRight } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import "./Section.css"


interface Props {
    title: string;
    description: string;
    logo: IconType;
    image: any;
    path: string;
}

const Section = (props: Props) => {
    const { title, description, logo, image, path } = props;
    const history = useHistory();
    const goTo = (path: string) => history.push(path);
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
                    {description}
                    <br/> <br/>
                    <Card.Img src={image} />
                </Card.Body>
                <Card.Footer>
                    <a className="btn btn-danger" onClick={() => goTo(path)} >
                        Abrir <FaArrowCircleRight/>
                    </a>
                </Card.Footer>
            </Card>
        </div>
    );
}

export default Section;