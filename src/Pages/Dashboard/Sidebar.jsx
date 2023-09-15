// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItemButton as ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home, HelpOutline, ExitToApp, FolderOpen} from '@mui/icons-material';
import styled from 'styled-components';
import Proptypes from 'prop-types'

const SidebarContainer = styled(Drawer)`
  width: 250px;
  flex-shrink: 0;
`;

const LogoutButton = styled(ListItem)`
  position: absolute;
  bottom: 0;
`;

const Sidebar = (props) => {
  return (
    <SidebarContainer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FolderOpen />
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
        <Divider />
        <ListItem button onClick={props.signout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </SidebarContainer>
  );
};

Sidebar.porpTypes = {
  logout: Proptypes.func.isRequired
}
export default Sidebar;

