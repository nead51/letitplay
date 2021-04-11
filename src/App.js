import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages';
import Step1 from './pages/step1';
import Step2 from './pages/step2';
import Step3 from './pages/step3';
import Step4 from './pages/step4';


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/index' exact component={Index} />
        <Route path='/step1' component={Step1} />
        <Route path='/step2' component={Step2} />
        <Route path='/step3' component={Step3} />
        <Route path='/step4' component={Step4} />
      </Switch>
    </Router>
  );
}

export default App;