import { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

const FirstName = () => {
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const names = target.value.trim();
		setName(names);

		if (!names || target.validity.valid) {
			setError('');
		} else {
			setError('Invalid character.');
		}
	};

	return (
		<TextField
			required
			id='firstName'
			name='firstName'
			type='text'
			label='First Name'
			value={name}
			error={!!name && !!error}
			helperText={!!error ? error : ' '}
			onChange={handleChange}
			inputProps={{
				pattern: "['`a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]{1,}",
			}}
			sx={{ flexGrow: '1', flexBasis: '140px' }}
		/>
	);
};

export default FirstName;
