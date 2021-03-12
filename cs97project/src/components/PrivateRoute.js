import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../contexts/UserProvider';

// Private routing so messaging is not public
export default function PrivateRoute({ component: Component, ...rest})
{
    const { currentUser } = useUserContext();
    return (
        <Route
            {...rest}
            render={props => {
                 return currentUser ? <Component {...props} /> :
                <Redirect to="/" />
            }}
        >
        </Route>
    );
}