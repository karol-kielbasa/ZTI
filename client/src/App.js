import React, { Fragment } from 'react';
import Navbar from './components/layouts/Navbar'
import Landing from './components/layouts/Landing'
import Dashboard from './components/layouts/Dashboard'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import Vehicles from './components/layouts/Vehicles'
import MyTrips from './components/layouts/MyTrips'
import PrivateRoute from './components/routing/PrivateRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './store'

import './App.css';

const App = () =>
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert/>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/vehicles' component={Vehicles} />
            <PrivateRoute exact path='/trips' component={MyTrips} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>

export default App;
