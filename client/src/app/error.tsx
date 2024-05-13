'use client';
import { useEffect } from 'react';
import { useApp_temp } from '@/providers/useApp_temp/useApp_temp';
import { Box, Button, Typography } from '@mui/material';
import { purgeStoredState } from 'redux-persist';
import { persistConfig } from '@/libs/redux/reducers';
import Window from '@/components/misc/Window/Window';

const Error = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	const user = useApp_temp().currentUser;

	const handleReset = () => reset();

	const handleClear = () => {
		purgeStoredState(persistConfig);
		handleReset();
	};

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Window>
			<Typography variant='h4' textAlign='center'>
				Sorry, something went wrong
			</Typography>
			<Typography textAlign='center'>
				An unexpected error has occured. Please try to refresh the page. If the problem
				persists, clear the cache and try again. This will result in a loss of unsaved
				data.
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
				<Button size='large' variant='outlined' onClick={handleReset}>
					Refresh
				</Button>
				<Button size='large' variant='outlined' onClick={handleClear} color='warning'>
					Clear Cache
				</Button>
			</Box>
		</Window>
	);
};

export default Error;
