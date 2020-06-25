import React, { useState, useEffect } from 'react'
import configRoute from '../../configs/roles';
import { Route, Switch, Redirect } from 'react-router-dom';
import './PrivateRoute.css'

function PrivateRoute(props) {

  return (
    <div className='main-container'>
      <Switch>
        {configRoute[props.role].route.map(route => {
          console.log('map', route)
          return (
            <Route
              exact path = {route.url}
              key = {route.url}
              render={(routeProps) => (
                <route.component {...routeProps} role={props.role} setRole={props.setRole} />
              )}
            />
          )
        })}

        <Redirect to={configRoute[props.role].redirect} />
      </Switch>
    </div>
  )
}

export default PrivateRoute;
