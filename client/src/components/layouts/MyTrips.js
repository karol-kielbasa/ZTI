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
});

function MyTrips(props) {
  const { classes, trips, getTrips, auth } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    const userId = auth.user._id;
    getTrips({ userId });
    setIsLoading(false);
  }, []);

  const handleOpen = (props) => {
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
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
              { value.status === "STARTED" ? 
              <IconButton edge="end" aria-label="Delete" onClick={handleOpen(value.vehicle)}>
                  <CancelIcon />
              </IconButton> : null }
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