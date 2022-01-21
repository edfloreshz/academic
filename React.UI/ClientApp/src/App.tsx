import Layout from './components/Layout/Layout';
import Home from './components/Pages/Private/Home/Home';
import './App.css';
import {Container} from 'react-bootstrap';
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
import {Constants} from "./constants/Constants";
import Aulas from "./components/Pages/Private/Aulas/Aulas";
import useLocalStorage from 'use-local-storage'
import React from "react";

export interface ILoading {
  loading: boolean;
}

export interface IPagination {
  totalPaginas: number,
  paginaActual: number,
}

function App() {
  let localTheme = localStorage.getItem("theme") === '"dark"' ? 'light' : 'dark';
  const defaultDark = window.matchMedia(`(prefers-color-scheme: ${localTheme})`).matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    let body = document.body;
    body.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }

  const setInitialTheme = () => {
    let body = document.body;
    body.setAttribute("data-theme", theme);
    setTheme(theme);
  }
  
  return (
    <div className={"App"}>
      <Layout theme={theme} switchTheme={switchTheme} setInitialTheme={setInitialTheme}>
        <Container>
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PrivateRoute component={Home} path="/" exact />
          <PrivateRoute component={() => <Home title={Constants.Title}/> } path="/home" exact />
          <AdminRoute component={Alumnos} path="/alumnos" />
          <AdminRoute component={Tutores} path="/tutores" />
          <AdminRoute component={Docentes} path="/docentes" />
          <PrivateRoute component={Asistencia} path="/asistencia" />
          <AdminRoute component={Aulas} path="/aulas" />
          <AdminRoute component={Pagos} path="/pagos" />
          <AdminRoute component={Constancias} path="/constancias" />
        </Container>
      </Layout>
    </div>
  );
}

export default App;
