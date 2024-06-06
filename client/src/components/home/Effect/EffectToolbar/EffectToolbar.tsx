import { EffectStateT } from '@/types/effect/effect.types';
import { Box, Divider } from '@mui/material';
import ColorActionsGroup from '../ColorActions/ColorActions';
import FrameActions from '../Actions/FrameActions/FrameActions';
import ColorSelector from '../../Color/SelectedColor/ColorSelector';
import BrushSizeSlider from '../BrushSizeSlider/BrushSizeSlider';
import TransitionSelector from './TransitionSelector/TransitionSelector';
import GridOptionsToggles from './GridOptionsToggles/GridOptionsToggles';
import GridOptionsSelects from './GridOptionsSelects/GridOptionsSelects';

const EffectToolbar = ({ activeEffect }: { activeEffect: EffectStateT | undefined }) => {
	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				padding: 2,
				borderBottom: `1px solid ${theme.palette.divider}`,
			})}
		>
			<GridOptionsToggles />
			<Divider orientation='vertical' flexItem />
			<GridOptionsSelects />
			<Divider orientation='vertical' flexItem />
			<FrameActions disabled={!activeEffect} />
			<Divider orientation='vertical' flexItem />
			<ColorSelector />
			{/* <BrushSizeSlider /> */}
			<Divider orientation='vertical' flexItem />
			<ColorActionsGroup />
			<Divider orientation='vertical' flexItem />
			<TransitionSelector />
			<Divider orientation='vertical' flexItem />
		</Box>
	);
};

export default EffectToolbar;
