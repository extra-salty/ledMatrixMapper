import { Repeat } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import EffectPlayerControls from '../EffectPlayer/EffectPlayerControls/EffectPlayerControls';

const PlayerActions = () => {
	const repeatOff = true;

	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				gap: '10px',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<Tooltip title='Toggle Repeat'>
				<span>
					<IconButton disabled={repeatOff}>
						<Repeat />
					</IconButton>
				</span>
			</Tooltip>
			{/* <PlayerControls /> */}
		</Box>
	);
};

export default PlayerActions;
