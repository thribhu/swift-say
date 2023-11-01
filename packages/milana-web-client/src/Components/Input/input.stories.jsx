import React from 'react';
import InputComponent from './index';

export default {
	component: InputComponent,
	title: 'InputComponent',
	args: {
		placeholder: 'Placeholder Text',
		value: '',
		variant: 'standard',
	},
	argTypes: {
		variant: {
			control: {
				type: 'select',
				options: ['standard', 'outlined', 'filled'],
			},
		},
	},
};

export const DefaultInput = (args) => <InputComponent {...args} />;
export const DisabledInput = (args) => (
	<InputComponent {...args} disabled={true} />
);
export const PasswordInput = (args) => (
	<InputComponent {...args} type='password' />
);
