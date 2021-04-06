import React from 'react';
import './App.css';
import Navbar from './Components/NavBar/index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import Intro from './pages/intro';
import Services from './pages/step1';
import Contact from './pages/contact';
import SignUp from './pages/signup';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/intro' component={Intro} />
        <Route path='/step1' component={Step1} />
        <Route path='/contact-us' component={Contact} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;