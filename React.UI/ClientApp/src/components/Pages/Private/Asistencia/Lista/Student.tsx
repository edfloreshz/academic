import React, { Component } from 'react';
import { IAlumno } from '../../../../../models/Alumno';
import "./Lista.css"

export interface Props {
    alumno: IAlumno;
    studentPresent: (idAlumno: number) => void;
}

export class Student extends Component<Props> {
    getStyle = () => {
        let mode = localStorage.getItem("TYPE_OF_THEME");
        console.log(mode)
        if (mode === null) {
            return {
                backgroundColor: this.props.alumno.presente
                    ? '#49B66E'
                    : '#fff',
                color: this.props.alumno.presente
                    ? "#fff"
                    : '#3b3b3b'
            }
        }
        return {
            backgroundColor: this.props.alumno.presente 
                ? '#49B66E' 
                : mode === "light" ? '#fff' : "#0d1117",
            color: this.props.alumno.presente 
                ? mode === "light" ? '#fff' : "#0d1117" 
                : '#3b3b3b'
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
