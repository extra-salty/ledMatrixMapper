import { EffectStateT } from '@/types/effect/effect.types';
import { Box } from '@mui/material';
import ColorActionsGroup from '../ColorActions/ColorActions';
import FrameActions from '../Actions/FrameActions/FrameActions';
import ColorSelector from '../../Color/SelectedColor/ColorSelector';
import TransitionSelector from './TransitionSelector/TransitionSelector';
import GridOptionsToggles from './GridOptionsToggles/GridOptionsToggles';
import GridOptionsSelects from './GridOptionsSelects/GridOptionsSelects';

const EffectToolbar = ({ activeEffect }: { activeEffect: EffectStateT | undefined }) => {
	const parts = [
		[<FrameActions key='frameActions' disabled={!activeEffect} />],
		[
			<ColorSelector key='colorSelector' />,
			<ColorActionsGroup key='colorActionsGroup' />,
			<TransitionSelector key='transitionSelector' />,
		],
		[
			<GridOptionsToggles key='gridOptionsToggles' />,
			<GridOptionsSelects key='gridOptionsSelects' />,
		],
	];

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
			{parts.map((elements, i) => (
				<Box
					key={i}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					{elements.map((element) => element)}
				</Box>
			))}
		</Box>
	);
};

export default EffectToolbar;
