import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Orange from './pages/index';


function LIP() {
  return (
    <Router>
        <Route path='./pages/orange' exact component={Orange} />
    </Router>
  );
}

export default LIP;