import React, { Component } from 'react';
import { IAlumno } from '../../../../../models/Alumno';
import "./Lista.css"

export interface Props {
    alumno: IAlumno;
    studentPresent: (idAlumno: number) => void;
}

export class Student extends Component<Props> {
    getBackground = () => {
        return {
            backgroundColor: this.props.alumno.presente
                ? '#49B66E'
                : "unset",
        }
    }
    
    getColor = () => {
        return {
            color: this.props.alumno.presente
                ? '#fff'
                : "unset"
        }
    }

    render() {
        const { idAlumno, nombres, apellidoMaterno, apellidoPaterno } = this.props.alumno;
        return (
            <div style={this.getBackground()} className="contain">
                <table>
                    <tr>
                        <td style={this.getColor()} className="">{idAlumno}</td>
                        <td style={this.getColor()} className="nameCol">{nombres} {apellidoPaterno} {apellidoMaterno}</td>
                        <td style={this.getColor()} className="nameCol">{new Date().toLocaleDateString('es-mx', { 
                            weekday:"long", 
                            year:"numeric", 
                            month:"short", 
                            day:"numeric"}) }</td>
                        <td style={this.getColor()} className="switchCol">
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
