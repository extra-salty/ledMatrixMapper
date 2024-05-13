import { Box } from '@mui/material';
import { EffectStateT } from '@/types/effects/effect.types';
import FrameActions from '../Actions/FrameActions/FrameActions';
import EffectOptions from '../Actions/Actions';
import FrameSizeSlider from '../Actions/FrameSizeSlider/FrameSizeSlider';

const EffectToolbar = ({ activeEffect }: { activeEffect: EffectStateT | undefined }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				// height: '40',
				padding: 2,
				borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
			}}
		>
			<FrameActions disabled={!activeEffect} />
			<EffectOptions />
			<FrameSizeSlider />
		</Box>
	);
};

export default EffectToolbar;
