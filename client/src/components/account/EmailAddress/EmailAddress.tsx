import { ChangeEvent, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const EmailAddress = ({ initialError }: { initialError: string }) => {
	const [email, setEmail] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleEmailChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const address = target.value.trim();
		setEmail(address);

		if (!address || target.validity.valid) {
			setError('');
		} else {
			setError('Invalid email address format.');
		}
	};

	useEffect(() => {
		if (initialError) setError(initialError);
	}, [initialError]);

	return (
		<TextField
			required
			fullWidth
			id='email'
			name='email'
			type='email'
			label='Email Address'
			value={email}
			error={!!email && !!error}
			helperText={!!error ? error : ' '}
			onChange={handleEmailChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<AccountCircle />
					</InputAdornment>
				),
			}}
		/>
	);
};

export default EmailAddress;
