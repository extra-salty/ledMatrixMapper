import { useDispatch } from 'react-redux';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { MenuItemProps } from '../../../../misc/GenericMenuItems/GenericMenuItems';
import { CoordinateT } from '@/types/misc/misc.types';
import {
	AutoFixOff,
	AutoGraph,
	Clear,
	ContentCopy,
	ContentCut,
	Flip,
	FormatColorFill,
	FormatColorReset,
} from '@mui/icons-material';

const useSelectionItems = (coordinate: CoordinateT): MenuItemProps[] => {
	const dispatch = useDispatch();

	return [
		{
			icon: <Clear />,
			text: 'Clear',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('clear')),
		},
		{
			icon: <FormatColorReset />,
			text: 'Clear Color',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('clearColor')),
		},
		{
			icon: <AutoFixOff />,
			text: 'Clear Transition',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('clearTransition')),
			divider: true,
		},
		{
			icon: <FormatColorFill />,
			text: 'Fill',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('fill')),
		},
		{
			icon: <FormatColorFill />,
			text: 'Fill Color',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('fillColor')),
		},
		{
			icon: <AutoGraph />,
			text: 'Fill Transition',
			onClick: () => dispatch(effectsDataActions.updateFrameSelection('fillTransition')),
			divider: true,
		},
		{
			icon: <ContentCopy />,
			text: 'Copy',
			onClick: () => {
				dispatch(effectsDataActions.setColorActionCoordinate(coordinate));
				dispatch(effectsDataActions.setActiveColorAction('copy'));
			},
		},
		{
			icon: <ContentCut />,
			text: 'Cut',
			onClick: () => {
				dispatch(effectsDataActions.setColorActionCoordinate(coordinate));
				dispatch(effectsDataActions.setActiveColorAction('cut'));
			},
		},
		{
			icon: <Flip />,
			text: 'Flip Horizontal',
			onClick: () => dispatch(effectsDataActions.flipSelectionHorizontally()),
		},
		{
			icon: <Flip sx={{ rotate: '90deg' }} />,
			text: 'Flip Vertical',
			onClick: () => dispatch(effectsDataActions.flipSelectionVertically()),
		},
	];
};

export default useSelectionItems;
