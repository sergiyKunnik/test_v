import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userService } from '../services/user.service';

export const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={props => (
      userService.checkIsLogin()
        .then(data => {
          console.log('private data => ', data)
        })
        .catch(error => {
          console.log('private error => ', error)
          props.history.redirect("/login");
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        })
        // localStorage.getItem('user')
        //     ? <Component {...props} />
        //     : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)