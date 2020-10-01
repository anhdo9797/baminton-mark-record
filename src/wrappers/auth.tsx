import React from 'react';
import { history, Redirect, useModel } from 'umi';

const Authenticated: React.FC<any> = ({ children }) => {
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState;

    if (currentUser && currentUser.uid) {
        if (
            currentUser.displayName ||
            currentUser.photoURL ||
            history.location.pathname == '/update-profile'
        )
            return children;
        else return <Redirect to="/update-profile" />;
    }
    return <Redirect to="/sign-in" />;
};

export default Authenticated;
