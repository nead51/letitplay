import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Step1 from './pages/step1';
import Category from './pages/category';
import Step3 from './pages/step3';
import Step4 from './pages/step4';
import Button from './Components/Buttons/button.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/step1' component={Step1} />
        <Route path='/category' component={Category} />
        <Route path='/step3' component={Step3} />
        <Route path='/step4' component={Step4} />
      </Switch>
    </Router>
  );
}

export default App;