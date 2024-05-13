import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import RowActionMenuItems from './RowActionMenuItems/RowActionMenuItems';

const RowActionMenu = ({ row }: { row: EffectsTableRowT }) => {
	const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<>
			{/* <DuplicateDialog
				row={row}
				open={isDuplicateDialogOpen}
				setOpen={setIsDuplicateDialogOpen}
			/>
			<DeleteDialog
				open={isDeleteDialogOpen}
				setOpen={setIsDeleteDialogOpen}
				selectedRows={[row]}
			/> */}
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
				anchorEl={anchorEl}
				onClose={handleClose}
				onClick={handleClose}
				MenuListProps={{
					'aria-labelledby': 'frame-menu-button',
				}}
			>
				<RowActionMenuItems
					row={row}
					setIsCreateDialogOpen={setIsDuplicateDialogOpen}
					setIsDeleteDialogOpen={setIsDeleteDialogOpen}
				/>
			</Menu>
		</>
	);
};

export default RowActionMenu;
