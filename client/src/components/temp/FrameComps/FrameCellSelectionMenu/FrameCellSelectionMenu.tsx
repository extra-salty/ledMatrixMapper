import { useDispatch } from 'react-redux';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import {
	AutoFixOff,
	AutoGraph,
	Clear,
	ContentCopy,
	ContentCut,
	ContentPaste,
	Flip,
	FormatColorFill,
	FormatColorReset,
} from '@mui/icons-material';
import { Dispatch, SetStateAction } from 'react';
import { ActionButtonProps } from '@/types/components/components.types';
import { CoordinateT } from '@/types/misc/misc.types';
import { Menu } from '@mui/material';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';
import {
	useActiveColorAction,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { isCellSelected } from '../FrameDynamic/FrameColumnDynamic/FrameCellDynamic/frameCellDynamicHelpers';
import { ColorActions } from '@/types/effect/effectPayload.types';

const FrameCellSelectionMenu = ({
	coordinate,
	frameId,
	anchorEl,
	isOpen,
	setIsOpen,
}: {
	coordinate: CoordinateT;
	frameId: string;
	anchorEl: HTMLButtonElement | null;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();

	const handleClose = () => setIsOpen(false);

	const colorAction = useActiveColorAction();
	const selection = useFrameCellSelection();

	const isSelected =
		colorAction === ColorActions.select &&
		selection?.frameId === frameId &&
		isCellSelected(coordinate, selection);

	const payload = { frameId, coordinate };

	const selectionItems: ActionButtonProps[] = [
		{
			icon: <Clear />,
			text: 'Clear',
			onClick: () =>
				dispatch(effectsDataActions.updateFrameSelection(ColorActions.clear)),
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
		},
		{
			icon: <ContentCopy />,
			text: 'Copy',
			onClick: () => {
				dispatch(effectsDataActions.setColorActionCoordinate(coordinate));
				dispatch(effectsDataActions.setActiveColorAction(ColorActions.copy));
			},
		},
		{
			icon: <ContentCut />,
			text: 'Cut',
			onClick: () => {
				dispatch(effectsDataActions.setColorActionCoordinate(coordinate));
				dispatch(effectsDataActions.setActiveColorAction(ColorActions.cut));
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

	const pasteItems: ActionButtonProps[] = [
		{
			icon: <ContentPaste />,
			text: 'Paste',
			onClick: () => dispatch(effectsDataActions.pasteFrameCellSelection(payload)),
		},
	];

	let items: ActionButtonProps[] = [];

	if (isSelected) {
		items = selectionItems;
	} else if (colorAction === ColorActions.copy || colorAction === ColorActions.cut) {
		items = pasteItems;
	} else {
	}

	return (
		<Menu
			id='frame-menu'
			open={isOpen}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			onClose={handleClose}
			onClick={handleClose}
			transitionDuration={100}
			MenuListProps={{ dense: true }}
		>
			<GenericMenuItems items={items} />
		</Menu>
	);
};

export default FrameCellSelectionMenu;
