'use client';
import { Routes, useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import { Box, Button, Divider, Typography } from '@mui/material';
import GoogleLoginProvider from '@/components/user/login/GoogleLoginProvider/GoogleLoginProvider';
import InternalLoginProvider from '@/components/user/login/InternalLoginProvider/InternalLoginProvider';

const Login = () => {
	const goToRegister = useRoutes(Routes.Register);

	return (
		<>
			<Typography variant='h4'>Log in to your account</Typography>
			<GoogleLoginProvider />
			<Divider>Or with email and password</Divider>
			<InternalLoginProvider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography>Don`t have an account?</Typography>
				<Button onClick={goToRegister}>Sign Up</Button>
			</Box>
		</>
	);
};

export default Login;
