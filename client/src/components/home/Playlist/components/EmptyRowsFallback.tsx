import { PlaylistAdd } from '@mui/icons-material';
import { Box } from '@mui/material';

const EmptyRowsFallback = () => {
	return (
		<Box
			sx={(theme) => ({
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'gray',
			})}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					{`Select an animation with '`}
					<PlaylistAdd fontSize='small' />
					{`' to edit it.`}
				</Box>
			</Box>
		</Box>
	);
};

export default EmptyRowsFallback;
