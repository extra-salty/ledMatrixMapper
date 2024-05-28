import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';
import { ActionButtonProps } from '@/types/components/components.types';
import { CopyAll, Delete } from '@mui/icons-material';
import { Menu } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

const FrameCellMenu = ({
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
			icon: <Delete />,
			text: 'Delete',
			onClick: () => {},
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

export default FrameCellMenu;
