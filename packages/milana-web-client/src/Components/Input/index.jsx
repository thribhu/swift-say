import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const CustomInput = styled(TextField)`
	background-color: #f2f2f2;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px;
	color: #333;
	font-size: 16px;
`;

const InputComponent = (props) => {
	const { label, variant, placeholder, fullWidth, onChange, value, disabled } =
		props;
	return (
		<CustomInput
			label={label}
			variant={variant}
			placeholder={placeholder}
			fullWidth={fullWidth}
			onChange={onChange}
			value={value}
			disabled={disabled}
		/>
	);
};

InputComponent.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	fullWidth: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	disabled: PropTypes.bool.isRequired,
};
export default InputComponent;
