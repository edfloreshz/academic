import React, { Component } from 'react';
import { IAlumno } from '../../../../models/Alumno';
import "./Asistencia.css"

export interface Props {
    alumno: IAlumno;
    studentPresent: (idAlumno: number) => void;
}

export class Student extends Component<Props> {
    getStyle = () => {
        return {
            backgroundColor: this.props.alumno.presente ? '#49B66E' : '#fff',
            color: this.props.alumno.presente ? '#fff' : '#3b3b3b'
        }
    }

    render() {
        const { idAlumno, nombres, apellidoMaterno, apellidoPaterno } = this.props.alumno;
        return (
            <div style={this.getStyle()} className="contain">
                <table>
                    <tr>
                        <td className="">{idAlumno}</td>
                        <td className="nameCol">{nombres} {apellidoPaterno} {apellidoMaterno}</td>
                        <td className="nameCol">{new Date().toLocaleDateString('es-mx', { 
                            weekday:"long", 
                            year:"numeric", 
                            month:"short", 
                            day:"numeric"}) }</td>
                        <td className="switchCol">
                            {this.props.alumno.presente ? 'Presente ' : 'Ausente '}
                            <label className="switch">
                                <input type="checkbox" onChange={this.props.studentPresent.bind(this, idAlumno)} defaultChecked={this.props.alumno.presente} />
                                <span className="slider round"/>
                            </label>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Student;
