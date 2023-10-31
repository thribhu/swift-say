import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({ label, variant, size, onClick }) => {
	const getButtonStyles = () => {
		let styles = '';

		switch (variant) {
			case 'outlined':
				styles += 'border: 1px solid #007bff; color: #007bff;';
				break;
			case 'text':
				styles += 'background: transparent; color: #007bff;';
				break;
			case 'bold':
				styles += 'font-weight: bold;';
				break;
			default:
				break;
		}

		switch (size) {
			case 'small':
				styles += 'padding: 5px 10px;';
				break;
			case 'large':
				styles += 'padding: 15px 20px;';
				break;
			default:
				styles += 'padding: 10px 15px;';
		}

		return styles;
	};

	const StyledButton = styled.button`
		background: #007bff;
		color: #fff;
		border: none;
		cursor: pointer;
		${getButtonStyles()}
	`;

	return (
		<StyledButton onClick={onClick}>{label}</StyledButton>
	);
};

Button.propTypes = {
	label: PropTypes.string.isRequired,
	variant: PropTypes.oneOf(['outlined', 'text', 'bold']),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	onClick: PropTypes.func,
};

export default Button;
