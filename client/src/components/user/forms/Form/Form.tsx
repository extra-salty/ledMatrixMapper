import { Box } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

const Form = ({
	children,
	onSubmit,
}: {
	children: ReactNode;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) => {
	return (
		<Box
			component='form'
			// autoComplete='off'
			onSubmit={onSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '15px',
			}}
		>
			{children}
		</Box>
	);
};

export default Form;
