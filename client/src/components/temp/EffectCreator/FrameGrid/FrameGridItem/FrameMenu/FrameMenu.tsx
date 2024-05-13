import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ActionButtonProps } from '@/types/components/components.types';
import {
	ContentCopy,
	ControlPointDuplicate,
	Delete,
	RestartAlt,
} from '@mui/icons-material';
import { Menu } from '@mui/material';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';

const FrameMenu = ({
	frameId,
	frameIndex,
	anchorEl,
	isOpen,
	setOpen,
}: {
	frameId: string;
	frameIndex: number;
	anchorEl: HTMLElement | null;
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch();

	const handleClose = () => setOpen(false);

	const items: ActionButtonProps[] = [
		{
			icon: <ControlPointDuplicate />,
			text: 'Add before',
			onClick: () => dispatch(effectsDataActions.addFrame(frameIndex)),
		},
		{
			icon: <ControlPointDuplicate sx={{ rotate: '180deg' }} />,
			text: 'Add after',
			onClick: () => dispatch(effectsDataActions.addFrame(frameIndex + 1)),
		},
		{
			icon: <ContentCopy />,
			text: 'Duplicate',
			onClick: () => dispatch(effectsDataActions.duplicateFrame(frameId)),
		},
		{
			icon: <RestartAlt />,
			text: 'Reset',
			onClick: () => dispatch(effectsDataActions.resetFrame(frameId)),
		},
		{
			icon: <Delete />,
			text: 'Delete',
			onClick: () => dispatch(effectsDataActions.deleteFrame(frameId)),
		},
	];

	return (
		<Menu
			id='frame-menu'
			open={isOpen}
			anchorEl={anchorEl}
			onClose={handleClose}
			onClick={handleClose}
			MenuListProps={{
				'aria-labelledby': 'frame-menu-button',
			}}
		>
			<GenericMenuItems items={items} />
		</Menu>
	);
};

export default FrameMenu;
