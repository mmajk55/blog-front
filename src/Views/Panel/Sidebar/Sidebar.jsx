import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostIcon from '@material-ui/icons/PostAdd';

export const mainListItems = (
  <div className='side-bar'>
    <NavLink to='/panel/dashboard' activeClassName="selected">
      <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink to='/panel/add-post' activeClassName="selected">
      <ListItem button>
          <ListItemIcon>
            <PostIcon />
          </ListItemIcon>
          <ListItemText primary="Add Post" />
      </ListItem>
    </NavLink>
  </div>
);