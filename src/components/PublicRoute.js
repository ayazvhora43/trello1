import React from 'react';
import {Navigate} from 'react-router';
import { connect } from "react-redux";

const PublicRoute = ({ children, ...props }) => {

    const isauth = props.isauth
    const isAuthenticated = isauth.isauth;

    if (isAuthenticated) {
        const obj = {};
        obj.email = isauth.email
        return <Navigate to="/Boards" state={obj} /> 
    }
    return children
}

const mapStateToProps = state => ({ isauth: state.isauth });

export default connect(mapStateToProps)(PublicRoute)