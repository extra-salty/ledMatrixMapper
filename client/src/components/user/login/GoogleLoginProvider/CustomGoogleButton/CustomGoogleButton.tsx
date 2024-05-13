import { Google } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

const CustomGoogleButton = ({ ripple }: { ripple: boolean }) => {
	return (
		<LoadingButton
			fullWidth
			size='large'
			variant='outlined'
			// loading={false}
			// focusRipple={ripple}
			centerRipple={true}
			sx={{
				height: '44px',
				position: 'absolute',
				top: '0',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '5px',
				}}
			>
				<Google fontSize='small' />
				<Typography fontWeight={500}>Sign it with Google</Typography>
			</Box>
		</LoadingButton>
	);
};

export default CustomGoogleButton;
