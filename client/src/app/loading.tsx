import { CircularProgress, Paper } from '@mui/material';

const Loading = () => {
	return (
		<Paper
			elevation={1}
			sx={{
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
		</Paper>
	);
};

export default Loading;
