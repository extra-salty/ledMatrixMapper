import { useDispatch } from 'react-redux';
import { memo, useState } from 'react';
import { playlistStateActions } from '@/libs/redux/features/playlist/state/slice';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import RowActionMenuItems from './RowActionMenuItems/RowActionMenuItems';

const RowActionMenu = ({
	rowId,
	originalRow,
}: {
	rowId: string;
	originalRow: AnimationTableRowT;
}) => {
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		// dispatch(playlistStateActions.setFocusedRow(originalRow));
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		// dispatch(playlistStateActions.setFocusedRow(undefined));
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size='small'
				id='frame-menu-button'
				aria-haspopup='true'
				aria-controls={isOpen ? 'frame-menu' : undefined}
				aria-expanded={isOpen ? 'true' : undefined}
				onClick={handleOpen}
				sx={{ padding: '0px' }}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id='frame-menu'
				open={isOpen}
				transitionDuration={200}
				anchorEl={anchorEl}
				onClose={handleClose}
				onClick={handleClose}
				MenuListProps={{
					'aria-labelledby': 'frame-menu-button',
				}}
			>
				<RowActionMenuItems rowId={rowId} originalRow={originalRow} />
			</Menu>
		</>
	);
};

export default memo(RowActionMenu);
