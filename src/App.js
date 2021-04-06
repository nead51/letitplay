import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Intro from './pages/intro';
import Step1 from './pages/step1';
import Step2 from './pages/step2';
import Step3 from './pages/step3';
import Step4 from './pages/step4';

import SignUp from './pages/signup';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/intro' component={Intro} />
        <Route path='/step1' component={Step1} />
        <Route path='/step2' component={Step2} />
        <Route path='/step3' component={Step3} />
        <Route path='/step4' component={Step4} />


        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;