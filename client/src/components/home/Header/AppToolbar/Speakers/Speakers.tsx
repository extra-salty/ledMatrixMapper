import { VolumeOff, VolumeUp } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

const Speakers = ({ deviceConnected }: { deviceConnected: boolean }) => {
	const isLeftMute = false;
	const isRightMute = false;

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', paddingInline: '12px' }}>
			<Tooltip title={isLeftMute ? 'Unmute left channel' : 'Mute left channel'}>
				<span>
					<IconButton disabled={!deviceConnected}>
						{isLeftMute ? (
							<VolumeOff sx={{ transform: 'rotate(180)' }} />
						) : (
							<VolumeUp sx={{ transform: 'rotate(180deg)' }} />
						)}
					</IconButton>
				</span>
			</Tooltip>
			<Tooltip title={isLeftMute ? 'Unmute right channel' : 'Mute right channel'}>
				<span>
					<IconButton disabled={!deviceConnected}>
						{isRightMute ? <VolumeOff /> : <VolumeUp />}
					</IconButton>
				</span>
			</Tooltip>
		</Box>
	);
};

export default Speakers;
