import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Toolbar from './components/Toolbar/Toolbar'
import Todolistbuilder from './container/TodolistBuilder/Todolistbuilder'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'
import * as actions from './store/actions/index'
import './App.css'

const App = (props) => {
  const { onAutoSignUp } = props;
  React.useEffect(() => {
    onAutoSignUp()
  }, [onAutoSignUp])
  return (
    <BrowserRouter>
      {/* <Toolbar /> */}
      <Route path="/mytasks/:id" exact component={Todolistbuilder} />
      <Route path="/" exact component={Auth} />
      <Route path="/logout" component={Logout} />
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
