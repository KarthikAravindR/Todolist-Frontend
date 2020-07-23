import React from 'react';
import { BrowserRouter,Route } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar'
import Todolistbuilder from './container/TodolistBuilder/Todolistbuilder'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'


function App() {
  return (
    <BrowserRouter>
      <Toolbar />
      <Route path="/mytasks" exact component={Todolistbuilder}/>
      <Route path="/" exact component={Auth}/>
      <Route path="/logout" component={Logout} />
    </BrowserRouter>
  );
}

export default App;
