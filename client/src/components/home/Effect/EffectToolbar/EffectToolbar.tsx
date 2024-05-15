import { Box, Divider } from '@mui/material';
import { EffectStateT } from '@/types/effects/effect.types';
import FrameActions from '../Actions/FrameActions/FrameActions';
import FrameOptions from '../Actions/FrameOptions';
import ColorSelector from '../../Color/SelectedColor/ColorSelector';

const EffectToolbar = ({ activeEffect }: { activeEffect: EffectStateT | undefined }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: 2,
				borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
				gap: 1,
			}}
		>
			<FrameActions disabled={!activeEffect} />
			<Divider orientation='vertical' flexItem />
			<FrameOptions />
			<Divider orientation='vertical' flexItem />
			<ColorSelector />
		</Box>
	);
};

export default EffectToolbar;
