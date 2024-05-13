'use client';
import RegisterForm from '@/components/user/forms/RegisterForm/RegisterForm';
import { Typography } from '@mui/material';
import { Options, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

const Register = () => {
	const options: Partial<Options> = {
		dictionary: {
			...zxcvbnCommonPackage.dictionary,
			...zxcvbnEnPackage.dictionary,
		},
		useLevenshteinDistance: true,
		// graphs: zxcvbnCommonPackage.adjacencyGraphs,
	};

	zxcvbnOptions.setOptions(options);

	return (
		<>
			<Typography variant='h4'>Create a new account</Typography>
			<RegisterForm />
		</>
	);
};

export default Register;
