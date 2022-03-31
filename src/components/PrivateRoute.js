import React from 'react';
import {Navigate} from 'react-router';
import { connect } from "react-redux";

const PrivateRoute = ({ children, ...props }) => {

    const isauth = props.isauth
    const isAuthenticated = isauth.isauth;

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/" />
}

const mapStateToProps = state => ({ isauth: state.isauth });

export default connect(mapStateToProps)(PrivateRoute)