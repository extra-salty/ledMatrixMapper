import { EffectStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import ColorActionsGroup from '../ColorActions/ColorActions';
import FrameActions from '../Actions/FrameActions/FrameActions';
import ColorSelector from '../../Color/SelectedColor/ColorSelector';
import TransitionSelector from './TransitionSelector/TransitionSelector';
import GridOptionsToggles from './GridOptionsToggles/GridOptionsToggles';
import GridOptionsSelects from './GridOptionsSelects/GridOptionsSelects';

const EffectToolbar = ({ activeEffect }: { activeEffect: EffectStateT | undefined }) => {
	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: 1,
				padding: 2,
				borderBottom: `1px solid ${theme.palette.divider}`,
			})}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
				}}
			>
				<FrameActions disabled={!activeEffect} />
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
				}}
			>
				<ColorSelector />
				<ColorActionsGroup />
				<TransitionSelector />
			</Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
				}}
			>
				<GridOptionsToggles />
				<GridOptionsSelects />
			</Box>
		</Box>
	);
};

export default EffectToolbar;
