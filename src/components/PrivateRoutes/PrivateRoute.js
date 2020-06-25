import React, { useState, useEffect } from 'react'
import configRoute from '../../configs/roles';
import { Route, Switch, Redirect } from 'react-router-dom';
import './PrivateRoute.css'
import * as storageItem from '../../configs/localStorageItems';

function PrivateRoute(props) {
  let role;
  useEffect(() => {
    let rememberMe = Boolean(localStorage.getItem(storageItem.role)) === true;
    console.log(rememberMe)
    role = rememberMe ? localStorage.getItem(storageItem.role) : localStorage.setItem(storageItem.role, 'guest');
    console.log(localStorage.getItem(storageItem.role))
    props.setRole(localStorage.getItem(storageItem.role));
  }, [])

  return (
    <div className='main-container'>
      <Switch>
        {configRoute[props.role].route.map(route => {
          return (
            <Route
              exact path = {route.url}
              // component = {route.component}
              key = {route.url}
              render={() => (
                <route.component role={props.role} setRole={props.setRole} />
              )}
            />
          )
        })}

        <Redirect to={configRoute[props.role].redirect} />
        {/* {console.log('private route role', props.role)} */}
      </Switch>
    </div>
  )
}

export default PrivateRoute;
