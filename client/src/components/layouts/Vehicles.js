import React, {useEffect} from 'react'
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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MapContainer from './MapContainer'; 
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getVehicles } from '../../actions/vehicles';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginTop:8,
    width:'100%'
  },
  toolbar: theme.mixins.toolbar,
});


function TabContainer({ children }) {
  return (
    <Typography component="div">
      {children}
    </Typography>
  );
}

const ListCotainer = ({ items }) => {
  return (
    <List dense styles={{height:500}}>
      {items.map(value => (
        <ListItem   button>
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

function Vehicles({ classes, vehicles, getVehicles }) {
  const [value, setValue] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    getVehicles();
    setIsLoading(false);

  }, []);


  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
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
              {!isLoading && vehicles.vehicles ? <MapContainer items={vehicles.vehicles}/> : <div><CircularProgress/></div>}
            </TabContainer>
            <TabContainer>
              {!isLoading && vehicles.vehicles ? <ListCotainer items={vehicles.vehicles}/> : <div><CircularProgress/></div>}
            </TabContainer>
          </SwipeableViews>
        </div>
      </Paper>
      <Button className={classes.button} type="submit" fullWidth variant="contained" color="primary">
          Find one !
      </Button>
    </div>
  )
}

Vehicles.propTypes = {
  vehicles: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  vehicles: state.vehicles,
})

export default connect(mapStateToProps, {getVehicles} )(withStyles(styles)(Vehicles));
