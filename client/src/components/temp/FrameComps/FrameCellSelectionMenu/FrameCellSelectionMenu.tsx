import { useDispatch } from 'react-redux';
import { ActionButtonProps } from '@/types/components/components.types';
import { ContentCopy, FormatColorFill, FormatColorReset } from '@mui/icons-material';
import { Menu } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';

const FrameCellSelectionMenu = ({
	anchorEl,
	isOpen,
	setIsOpen,
}: {
	anchorEl: HTMLButtonElement | null;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();

	const handleClose = () => setIsOpen(false);

	const items: ActionButtonProps[] = [
		{
			icon: <FormatColorReset />,
			text: 'Clear',
			onClick: () => {},
		},
		{
			icon: <FormatColorFill />,
			text: 'Fill',
			onClick: () => dispatch(effectsDataActions.fillFrameCellSelection()),
		},
		{
			icon: <ContentCopy />,
			text: 'Copy',
			onClick: () => dispatch(effectsDataActions.fillFrameCellSelection()),
		},
	];

	return (
		<Menu
			id='frame-menu'
			open={isOpen}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			onClose={handleClose}
			onClick={handleClose}
		>
			<GenericMenuItems items={items} />
		</Menu>
	);
};

export default FrameCellSelectionMenu;
