import React, { Component } from 'react';
import { IAlumno } from '../../../../models/Alumno';
import Student from './Student';
import "./Asistencia.css"

export interface Props {
    alumnos: IAlumno[];
    studentPresent: (idAlumno: number) => void;
}

class Class extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.state = {
            alumnos: [],
            studentPresent() { }
        }
    }
    render() {
        return this.props.alumnos.map((alumno) => (
            <Student key={alumno.idAlumno} alumno={alumno} studentPresent={this.props.studentPresent} />
        ));
    }
}

export default Class;