import useSelectionItems from './useItems/useSelectionItems';
import useDefaultItems from './useItems/useDefaultItems';
import {
	useActiveColorAction,
	useFrameCellSelection,
} from '@/libs/redux/features/effects/data/selector';
import { useDispatch } from 'react-redux';
import { isCellSelected } from '../FrameDynamic/FrameColumnDynamic/FrameCellDynamic/frameCellDynamicHelpers';
import { Dispatch, SetStateAction } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { CoordinateT } from '@/types/misc/misc.types';
import { ContentPaste } from '@mui/icons-material';
import { Menu } from '@mui/material';
import GenericMenuItems, {
	MenuItemProps,
} from '@/components/misc/GenericMenuItems/GenericMenuItems';

const FrameCellMenu = ({
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
		colorAction === 'select' &&
		selection?.frameId === frameId &&
		isCellSelected(coordinate, selection);

	const payload = { frameId, coordinate };

	let items: MenuItemProps[] = [];
	const selectionItems = useSelectionItems(coordinate);
	const defaultItems = useDefaultItems(payload);
	const pasteItems: MenuItemProps[] = [
		{
			icon: <ContentPaste />,
			text: 'Paste',
			onClick: () => dispatch(effectsDataActions.pasteFrameCellSelection(payload)),
		},
	];

	if (isSelected) {
		items = selectionItems;
	} else if (colorAction === 'copy' || colorAction === 'cut') {
		items = pasteItems;
	} else {
		items = defaultItems;
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

export default FrameCellMenu;
