import Layout from './components/Layout/Layout';
import Home from './components/Pages/Private/Home/Home';
import './App.css';
import { Container } from 'react-bootstrap';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Login from './components/Pages/Public/Login/Login';
import Alumnos from './components/Pages/Private/Alumnos/Alumnos';
import Tutores from './components/Pages/Private/Tutores/Tutores';
import Docentes from './components/Pages/Private/Docentes/Docentes';
import Asistencia from './components/Pages/Private/Asistencia/Asistencia';
import Constancias from './components/Pages/Private/Constancias/Constancias';
import Pagos from './components/Pages/Private/Pagos/Pagos';
import AdminRoute from './components/Routes/AdminRoute';
import {Constants} from "./Constants";

export interface ILoading {
  loading: boolean;
}

export interface IPagination {
  totalPaginas: number,
  paginaActual: number,
}

function App() {
  return (
    <Layout>
      <Container>
        <PublicRoute restricted={true} component={Login} path="/login" exact />
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={() => <Home title={Constants.Title}/> } path="/home" exact />
        <AdminRoute component={Alumnos} path="/alumnos" />
        <AdminRoute component={Tutores} path="/tutores" />
        <AdminRoute component={Docentes} path="/docentes" />
        <PrivateRoute component={Asistencia} path="/asistencia" />
        <AdminRoute component={Pagos} path="/pagos" />
        <AdminRoute component={Constancias} path="/constancias" />  
      </Container>
    </Layout>
  );
}

export default App;
