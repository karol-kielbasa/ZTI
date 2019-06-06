import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from './Navigator'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { getTrips } from '../../actions/trips';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.paper
  },
  modalText: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
  paper: {
    margin: '0 auto',
    width: '50%',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
  toolbar: theme.mixins.toolbar,
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 2,
  },
});

function getSteps() {
  return ['Finish your trip', 'Submit your opinion'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Click 'NEXT' to finish your trip. Thanks ! hope you enjoyed :)`;
    case 1:
      return 'Please submit your opinion. It is very helpful for us and keeps our services in good shape';
    default:
      return 'Unknown step';
  }
}

function MyTrips(props) {
  const { classes, trips, getTrips, auth } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [rate, setRate] = React.useState(null);
  const [trip, setTrip] = React.useState(null);
  const inputLabel = React.useRef(null);
const [activeStep, setActiveStep] = React.useState(0);
const steps = getSteps();

  useEffect(() => {
    setIsLoading(true);
    const userId = auth.user._id;
    getTrips({ userId });
    setIsLoading(false);
  }, []);

  const handleOpen = (value) => {
    setActiveStep(0);
    setOpen(true);
    setTrip(value)
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  async function handleNext() {
    if(activeStep === steps.length - 1){
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
      const tripId = trip._id;
      const vehicleId = trip.vehicle._id;

      const body = JSON.stringify({ tripId, vehicleId, rate });
      try {
        console.log(body);
          const res = await axios.post('/api/trips/end', body, config);
          const userId = auth.user._id;
          getTrips({ userId });
      } catch (err){
        console.log("Error while creating trip");
        console.log(err);
      }
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);

  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleRate = name => event => {
   setRate(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Navigator />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography className={classes.modalText} variant="h6" id="modal-title">
          Yours trips
          </Typography>
        {!isLoading && trips.trips ? <List dense>
          {trips.trips.map(value => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar src={value.vehicle.imgUrl} />
              </ListItemAvatar>
              <ListItemText primary={`Trip with vehicle ${value.vehicle.name} | Status: ${value.status}`} />
              {value.status === "STARTED" ?
                <IconButton edge="end" aria-label="Delete" onClick={() => handleOpen(value)}>
                  <CancelIcon />
                </IconButton> : null}
            </ListItem>
          ))}

        </List> : <div><CircularProgress /></div>}
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
        <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  {activeStep === steps.length - 1 ? <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                    Age
                  </InputLabel>
                  <Select
                    native
                    value={rate}
                    onChange={handleRate('Rate')}
                    input={
                      <OutlinedInput name="Rate" labelWidth={150} id="outlined-age-native-simple" />
                    }
                  >
                    <option value={1}>Very Unsatisfied</option>
                    <option value={2}>Unsatisfied</option>
                    <option value={3}>Neutral</option>
                    <option value={4}>Satisfied</option>
                    <option value={5}>Very Satisfied</option>
                  </Select>
                </FormControl> : null}
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Thanks for sharing your opinion !</Typography>
        </Paper>
      )}
        </div>
      </Modal>
      </main>
    </div>
  );
}

MyTrips.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  vehicles: state.vehicles,
  trips: state.trips,
  auth: state.auth
})


export default connect(mapStateToProps, { getTrips })(withStyles(styles)(MyTrips));