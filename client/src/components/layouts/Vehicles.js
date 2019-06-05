import React, { useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigator from './Navigator'
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MapContainer from './MapContainer';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getVehicles } from '../../actions/vehicles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const drawerWidth = 250;

const styles = theme => ({
  root: {
    marginLeft: drawerWidth,
    'justify-content': 'flex-start',
    'flex-direction': 'column',
    'align-content': 'center'
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
    marginTop: 8,
    padding: theme.spacing.unit * 1,
    position: 'relative',
    overflow: 'auto',
    height: 525
  },
  list: {
    maxHeight: 450,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginTop: 8,
    width: '100%'
  },
  toolbar: theme.mixins.toolbar,
  paper: {
    margin: '0 auto',
    width: '50%',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
  modalText: {
    padding: theme.spacing.unit * 2,
  },
  modalButton: {
    marginTop: '40%',
    width:'50%'
  },
  modalButtonTrip: {
    marginTop: '40%',
    width:'50%',
  }
});

const distanceTab = [];
function TabContainer({ children }) {
  return (
    <Typography component="div">
      {children}
    </Typography>
  );
}

const ListCotainer = ({ items }) => {
  return (
    <List dense styles={{ height: 500 }}>
      {items.map(value => (
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={value.imgUrl} />
          </ListItemAvatar>
          <ListItemText primary={value.name} />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

function Vehicles({ classes, vehicles, getVehicles, auth }) {
  const [value, setValue] = React.useState(0);
  const [distanceTabIndex, setDistanceTabIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = React.useState({ lat: 0, lng: 0 });

  function getCurent() {
    const geolocation = navigator.geolocation;
    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        reject(new Error('Permission denied'));
      });
    });

    return location
  }


  const calcualteDistances = () => {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    vehicles.vehicles.map(vehicle => {
      var a = 0.5 - c((location.lat - vehicle.lat) * p) / 2 +
        c(vehicle.lat * p) * c(location.lat * p) *
        (1 - c((location.lng - vehicle.long) * p)) / 2;
      let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      distanceTab.push({
        distance: distance,
        locationLat: location.lat,
        locationLng: location.lng,
        vehicleLat: vehicle.lat,
        vehicleLng: vehicle.long,
        vehicleId: vehicle._id
      })
    })
    distanceTab.sort((a,b) =>  a.distance - b.distance);
  };
  function findAnotherOne() {
    if(distanceTabIndex < distanceTab.length - 1){
      setDistanceTabIndex(distanceTabIndex+1);
    } else {
      setDistanceTabIndex(0);
    }
  }

  const handleOpen = () => {
    setOpen(true);
    if(distanceTab.length===0){
      calcualteDistances();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDistanceTabIndex(0);
  };
  useEffect(() => {
    setIsLoading(true);
    getVehicles();
    setIsLoading(false);
    async function location() {
      const val = await getCurent();
      setLocation({ lat: val.coords.latitude, lng: val.coords.longitude });
    }
    location();
  }, []);


  function handleChange(event, newValue) {
    setValue(newValue);
  }
  function handleChangeIndex(index) {
    setValue(index);
  }

  async function activateTrip() {
    const vehicleId = distanceTab[distanceTabIndex].vehicleId;
    const userId = auth.user._id
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = JSON.stringify({ userId, vehicleId });
    try {
      console.log(body);
        const res = await axios.post('/api/trips', body, config);
        setOpen(false);
        setDistanceTabIndex(0);
    } catch (err){
      console.log("Error while creating trip");
      console.log(err);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper, }}>
        <div className={classes.toolbar} />
        <Navigator />
      </Drawer>
      <Paper className={classes.content}>
        <div className={classes.list}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Map" />
            <Tab label="List" />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TabContainer>
              {!isLoading && vehicles.vehicles ? <MapContainer items={vehicles.vehicles} /> : <div><CircularProgress /></div>}
            </TabContainer>
            <TabContainer>
              {!isLoading && vehicles.vehicles ? <ListCotainer items={vehicles.vehicles} /> : <div><CircularProgress /></div>}
            </TabContainer>
          </SwipeableViews>
        </div>
      </Paper>
      <Button className={classes.button} type="submit" fullWidth variant="contained" color="primary" onClick={handleOpen}>
        Find one !
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <Typography className={classes.modalText} variant="h6" id="modal-title">
            The nearest vehicle
          </Typography>
          <MapContainer items={vehicles.vehicles} styles={{ width: '50%', height: '40%' }} lineToDraw={distanceTab[distanceTabIndex]} />
          <Button className={classes.modalButton} type="submit" fullWidth variant="contained" color="primary" onClick={findAnotherOne}>
            Find another one !
            </Button>
            <Button className={classes.modalButtonTrip} type="submit" variant="contained" color="secondary" onClick={activateTrip} >
            Take one !
            </Button>
        </div>
      </Modal>
    </div>
  )
}

Vehicles.propTypes = {
  vehicles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  vehicles: state.vehicles,
  auth: state.auth
})

export default connect(mapStateToProps, { getVehicles })(withStyles(styles)(Vehicles));
