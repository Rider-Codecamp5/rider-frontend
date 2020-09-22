import React from 'react';
import configRoute from '../../configs/roles';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../../styles/PrivateRoute.css';

function PrivateRoute(props) {
  return (
    <div className='main-container'>
      <Switch>
        {configRoute[props.role].route.map(route => {
          console.log('private role', props.role);
          return (
            <Route
              exact
              path={route.url}
              key={route.url}
              render={routeProps => (
                <route.component
                  {...routeProps}
                  role={props.role}
                  setRole={props.setRole}
                  userInfo={props.userInfo}
                  socketRef={props.socketRef}
                />
              )}
            />
          );
        })}
        <Redirect to={configRoute[props.role].redirect} />
      </Switch>
    </div>
  );
}

export default PrivateRoute;
