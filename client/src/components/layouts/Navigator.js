import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import DirectionIcon from '@material-ui/icons/Directions';
import DashboardIcon from '@material-ui/icons/Dashboard';

const menu = [
    {
      id: ' Menu',
      children: [
        { id: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
        { id: 'Availabe vehicles', icon: <TimeToLeaveIcon />, link: '/vehicles' },
        { id: 'My trips', icon: <DirectionIcon />, link: '/trips' },
      ],
    }
  ]
  
export default function Navigator() {
    return (
        <div>
            <List>
          {menu.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem >
                <ListItemText>
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link }) => (
                <ListItem button dense key={childId} >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <Link to={link}>
                    <ListItemText >
                      {childId}
                    </ListItemText>
                  </Link>
                </ListItem>
              ))}
            </React.Fragment>
          ))}

        </List>
        </div>
    )
}

