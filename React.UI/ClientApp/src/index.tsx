import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import React, { FC } from "react";

const rootElement = document.getElementById('root');

const LightTheme = React.lazy(() => import('./themes/lightTheme'));
const DarkTheme = React.lazy(() => import('./themes/darkTheme'));

interface Props {}

const ThemeSelector: FC<Props> = ({ children }) => {
    const CHOSEN_THEME = localStorage.getItem('TYPE_OF_THEME');
    return (
        <>
            <React.Suspense fallback={<></>}>
                {(CHOSEN_THEME === "light") && <LightTheme />}
                {(CHOSEN_THEME === "dark") && <DarkTheme />}
            </React.Suspense>
            {children}
        </>
    )
}

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeSelector />
        <App />
      <ThemeSelector />
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
