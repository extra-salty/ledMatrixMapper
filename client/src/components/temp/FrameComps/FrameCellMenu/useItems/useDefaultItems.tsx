import { useDispatch } from 'react-redux';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { FrameColorActionPayloadT } from '@/types/effect/effectPayload.types';
import { MenuItemProps } from '../../../../misc/GenericMenuItems/GenericMenuItems';
import {
	AutoFixOff,
	AutoGraph,
	Brush,
	Clear,
	FormatColorReset,
} from '@mui/icons-material';

const useDefaultItems = (payload: FrameColorActionPayloadT): MenuItemProps[] => {
	const dispatch = useDispatch();

	return [
		{
			icon: <Clear />,
			text: 'Clear',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({
						...payload,
						colorAction: 'clearColorAndTransition',
					}),
				),
		},
		{
			icon: <FormatColorReset />,
			text: 'Clear Color',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({ ...payload, colorAction: 'clearColor' }),
				),
		},
		{
			icon: <AutoFixOff />,
			text: 'Clear Transition',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({
						...payload,
						colorAction: 'clearTransition',
					}),
				),
			divider: true,
		},
		{
			icon: <Brush />,
			text: 'Set',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({
						...payload,
						colorAction: 'setColorAndTransition',
					}),
				),
		},
		{
			icon: <Brush />,
			text: 'Set Color',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({ ...payload, colorAction: 'setColor' }),
				),
		},
		{
			icon: <AutoGraph />,
			text: 'Set Transition',
			onClick: () =>
				dispatch(
					effectsDataActions.updateFrameCell({
						...payload,
						colorAction: 'setTransition',
					}),
				),
		},
	];
};

export default useDefaultItems;
