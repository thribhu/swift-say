import Sdk from 'casdoor-js-sdk';
import { config } from '../Setting';
import { useState } from 'react';

export default function useCasdoor() {
	const [sdk] = useState(new Sdk(config));
	return sdk;
}
