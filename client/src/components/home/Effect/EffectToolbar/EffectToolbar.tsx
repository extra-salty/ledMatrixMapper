import { EffectStateT } from '@/types/effects/effect.types';
import { Box, Divider } from '@mui/material';
import ColorActionsGroup from '../ColorActions/ColorActions';
import FrameActions from '../Actions/FrameActions/FrameActions';
import FrameOptions from '../Actions/FrameOptions';
import ColorSelector from '../../Color/SelectedColor/ColorSelector';
import BrushSizeSlider from '../BrushSizeSlider/BrushSizeSlider';

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
			<FrameOptions />
			<Divider orientation='vertical' flexItem />
			<FrameActions disabled={!activeEffect} />
			<Divider orientation='vertical' flexItem />
			<ColorActionsGroup />
			<Divider orientation='vertical' flexItem />
			<BrushSizeSlider />
			<Divider orientation='vertical' flexItem />
			<ColorSelector />
		</Box>
	);
};

export default EffectToolbar;
