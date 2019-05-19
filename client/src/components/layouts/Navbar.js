import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const loggedLinks = (
        <ul>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' /> {' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    )
    const notLoggedLinks = (
        <ul>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i>ZTI</Link>
            </h1>
            <Fragment>{isAuthenticated ? loggedLinks : notLoggedLinks}</Fragment>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar)
