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
			<Typography variant='body1'>{`Select an animation from the 'Animations' tab`}</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant='body1'>{`and click on '`}</Typography>
				<Add fontSize='small' />
				<Typography variant='body1'>{`' to add a new effect to it.`}</Typography>
			</Box>
		</Box>
	);
};

export default EmptyRowsFallback;
