import { Cast, CastConnected } from '@mui/icons-material';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';

const Connect = () => {
	const isLoading = false;
	const isConnected = false;

	return (
		<Tooltip title={isConnected ? 'Disconnect' : 'Connect'}>
			<span>
				{isLoading ? (
					<CircularProgress size='10px' />
				) : (
					<IconButton disabled>{isConnected ? <CastConnected /> : <Cast />}</IconButton>
				)}
			</span>
		</Tooltip>
	);
};

export default Connect;
