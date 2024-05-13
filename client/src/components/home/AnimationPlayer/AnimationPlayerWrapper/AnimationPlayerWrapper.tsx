import useConvertedData from '../../Playlist/usePlaylistProps/useConvertedData';
import { Box } from '@mui/material';
import EffectPlayerToolbar from '@/components/temp/PlayerComps/EffectPlayerToolbar/EffectPlayerToolbar';
import AnimationPlayer from '../AnimationPlayer';

const AnimationPlayerWrapper = () => {
	const { timestamps } = useConvertedData();

	return (
		<Box>
			<EffectPlayerToolbar />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					padding: 4,
				}}
			>
				<AnimationPlayer timestamps={timestamps} />
			</Box>
		</Box>
	);
};

export default AnimationPlayerWrapper;
