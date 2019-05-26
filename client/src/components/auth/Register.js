import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


const Register = ({ setAlert, register, classes }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Password do not match', 'danger');
        }
        else {
            register({ name, email, password });
        }
    }

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign Up
            </Typography>
                <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name" value={name} onChange={e => onChange(e)} autoComplete="name" autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" value={email} onChange={e => onChange(e)} autoComplete="email" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" value={password} onChange={e => onChange(e)} autoComplete="current-password" />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Confirm Password</InputLabel>
                        <Input name="password2" type="password" id="password2" value={password2} onChange={e => onChange(e)} autoComplete="current-password" />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
              </Button>
                </form>
            </Paper>
        </main>
    )
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(null, { setAlert, register })(withStyles(styles)(Register));
