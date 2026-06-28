import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import reportWebVitals from './utils/report_web_vitals';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
