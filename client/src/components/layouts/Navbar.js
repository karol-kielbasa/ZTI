import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
});

const Navbar = ({ auth: { isAuthenticated, loading }, logout, classes }) => {
    const loggedLinks = (
        <div><Button onClick = {logout}><Link to="/">Logout</Link></Button></div>
    )
    const notLoggedLinks = (
        <div>
            <Button><Link to="/login">Sign in</Link></Button>
            <Button><Link to="/register">Sign up</Link></Button>
        </div>
    )
    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap> ZTI </Typography>
                <div>{isAuthenticated ? loggedLinks : notLoggedLinks}</div>
            </Toolbar>
        </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(withStyles(styles)(Navbar))