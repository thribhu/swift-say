// src/components/Sidebar.js
import React from 'react';
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Avatar,
} from '@mui/material';
import { Person3, ExitToApp, Work } from '@mui/icons-material';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Fix the import here
import { isValidUrl } from '../../utils/string.helper';

const SidebarContainer = styled(Drawer)`
	width: 250px;
	flex-shrink: 0;
`;

const Sidebar = (props) => {
	return (
		<SidebarContainer variant='permanent' anchor='left'>
			<List>
				<ListItem>
					<ListItemIcon>
						<Avatar src={props.avatar} alt='use  preferred avatar' />
					</ListItemIcon>
					<ListItemText>{props.name}</ListItemText>
				</ListItem>
				<ListItemButton onClick={() => props.setNowNav('profile')}>
					<ListItemIcon>
						<Person3 />
					</ListItemIcon>
					<ListItemText primary='Profile' />
				</ListItemButton>
				<ListItemButton onClick={() => props.setNowNav('SaleOppurtunity')}>
					<ListItemIcon>
						<Work />
					</ListItemIcon>
					<ListItemText primary='Sales Oppurtunity' />
				</ListItemButton>
				<Divider />
				<ListItemButton onClick={props.signout}>
					<ListItemIcon>
						<ExitToApp />
					</ListItemIcon>
					<ListItemText primary='Logout' />
				</ListItemButton>
			</List>
		</SidebarContainer>
	);
};

Sidebar.propTypes = {
	signout: PropTypes.func.isRequired,
	avatar: (props, propName, componentName) => {
		if (!isValidUrl(props[propName])) {
			return new Error(
				`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`,
			);
		}
	},
	name: PropTypes.string.isRequired,
	setNowNav: PropTypes.func.isRequired, // Add this line
};
export default Sidebar;
