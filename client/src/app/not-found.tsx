'use client';
import { useState } from 'react';
import { useApp_temp } from '@/providers/useApp_temp/useApp_temp';
import { LoadingButton } from '@mui/lab';
import { Divider, Typography } from '@mui/material';
import { Routes, useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import Window from '@/components/misc/Window/Window';

const NotFound = () => {
	const user = useApp_temp().currentUser;

	const [loading, setLoading] = useState<boolean>(false);

	const goToLogin = useRoutes(Routes.Login);
	const goToHome = useRoutes(Routes.Home);

	const handleRedirect = () => {
		setLoading(true);

		if (user) {
			goToHome();
		} else {
			goToLogin();
		}

		setLoading(false);
	};

	const buttonText = user ? 'Go to Home' : 'Go to Log In';

	return (
		<Window>
			<Typography variant='h4' textAlign='center'>
				Page not found
			</Typography>
			<Typography textAlign='center'>
				The page cannot be found. Please make sure you typed the URL correctly and try
				again.
			</Typography>
			<Divider>Or</Divider>
			<LoadingButton
				size='large'
				variant='text'
				loading={loading}
				onClick={handleRedirect}
				sx={{ marginInline: 'auto' }}
			>
				{buttonText}
			</LoadingButton>
		</Window>
	);
};

export default NotFound;
