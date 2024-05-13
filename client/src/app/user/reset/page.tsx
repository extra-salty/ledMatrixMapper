'use client';
import { Typography } from '@mui/material';
import PasswordResetForm from '@/components/user/forms/PasswordResetForm/PasswordResetForm';

const Reset = () => {
	return (
		<>
			<Typography variant='h4'>Reset your password</Typography>
			<Typography>
				To reset your password, enter your email address below and submit.
			</Typography>
			<PasswordResetForm />
		</>
	);
};

export default Reset;
