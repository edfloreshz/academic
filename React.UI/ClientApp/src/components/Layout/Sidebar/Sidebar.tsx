import { useHistory } from 'react-router-dom';
import { IoMdSchool } from 'react-icons/io';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import "../Layout.css"
import "./Sidebar.css"

const Sidebar = () => {
    const history = useHistory();
    const goTo = (path: string) => history.push(path);
    return (
        <>
            <div className="Area Alumnos">
                <button className="sideButton" onClick={() => goTo("/alumnos")}><IoMdSchool /> <br />Alumnos</button>
            </div>
            <div className="Area Docentes">
                <button className="sideButton" onClick={() => goTo("/docentes")}><FaChalkboardTeacher /><br /> Docentes</button>
            </div>
            <div className="Area Asistencia">
                <button className="sideButton" onClick={() => goTo("/asistencia")}><BsCardChecklist /><br /> Asistencia</button>
            </div>
            <div className="Area Constancias">
                <button className="sideButton" onClick={() => goTo("/constancias")}><BsCardChecklist /><br /> Constancias</button>
            </div>
        </>
    )
}

export default Sidebar;