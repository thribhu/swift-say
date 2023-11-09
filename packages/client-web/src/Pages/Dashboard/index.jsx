import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/api.config';
import Sidebar from './Sidebar';
import { Typography, Container, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const Dashboard = (props) => {
	const [activeNav, setActiveName] = useState('');
	const [showSales, setShowSales] = useState(false);
	const [sales, setSales] = useState([]);
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (activeNav === 'SaleOppurtunity') {
			(async function () {
				try {
					const res = await axiosInstance.get('getSalesOpportunities');
					if (res.status === 200) {
						setShowSales(true);
						setSales(res.data.opportunities);
					} else {
						setShowSales(false);
					}
				} catch (error) {
					if (error.response.data.message) {
						setTitle(error.response.data.message);
					}
					console.error('Error fetching data:', error);
				}
			})();
		}
	}, [activeNav, showSales]);
	useEffect(() => {
		return () => {
			setActiveName('');
		};
	}, []);
	return (
		<Container>
			<Sidebar
				name={props.name}
				avatar={props.avatar}
				signout={props.signout}
				setNowNav={setActiveName}
				activeNav={activeNav}
			/>
			<Box>
				<Typography variant='h2'> {props.name}</Typography>
				{title && <Typography>{title}</Typography>}
				{showSales && <SalesOpportunitiesGrid data={sales} />}
			</Box>
		</Container>
	);
};

const columns = [
	{ field: 'opportunityName', headerName: 'Opportunity Name', width: 200 },
	{ field: 'potentialRevenue', headerName: 'Potential Revenue', width: 200 },
	{ field: 'closingDate', headerName: 'Closing Date', width: 150 },
	{ field: 'status', headerName: 'Status', width: 150 },
];

const SalesOpportunitiesGrid = ({ data }) => {
	return (
		<div style={{ height: 400, width: '100%', margin: '30px' }}>
			<DataGrid rows={data} columns={columns} pageSize={5} />
		</div>
	);
};

Dashboard.propTypes = {
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	signout: PropTypes.func.isRequired,
	// Add other prop validations as needed
};

SalesOpportunitiesGrid.propTypes = {
	data: PropTypes.array.isRequired, // Add the prop validation for 'data'
};
export default Dashboard;
