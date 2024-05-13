import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { getAnimations } from '@/libs/redux/features/animations/thunk';
import { Box, Paper } from '@mui/material';

const Main = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch<AppDispatch>();
	dispatch(getAnimations());

	return (
		<Box
			component='main'
			sx={{
				height: 'calc(100% - 80px)',
				width: '100%',
			}}
		>
			<Paper
				elevation={1}
				square
				sx={{
					height: '100%',
					width: '100%',
				}}
			>
				{children}
			</Paper>
		</Box>
	);
};

export default Main;
