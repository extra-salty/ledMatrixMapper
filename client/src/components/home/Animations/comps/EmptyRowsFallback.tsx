import { Add } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const EmptyRowsFallback = () => {
	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				color: theme.palette.text.disabled,
			})}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant='body1'>{`Create an animation with '`}</Typography>
				<Add fontSize='small' />
				<Typography variant='body1'>{`' to get started`}</Typography>
			</Box>
			<Typography variant='body1'>
				{'or load the demo data from above (to be added)'}
			</Typography>
		</Box>
	);
};

export default EmptyRowsFallback;
