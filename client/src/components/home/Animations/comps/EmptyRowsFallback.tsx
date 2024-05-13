import { Add } from '@mui/icons-material';
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
					{`Create an animation with '`}
					<Add fontSize='small' />
					{`' to get started`}
				</Box>
				<span>or</span>
				<span>{'load the demo data from above (to be added)'}</span>
			</Box>
		</Box>
	);
};

export default EmptyRowsFallback;
