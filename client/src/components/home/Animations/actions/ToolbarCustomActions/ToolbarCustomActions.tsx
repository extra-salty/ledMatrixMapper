import { useState } from 'react';
import { useAnimationsRowSelection } from '@/libs/redux/features/animations/selectors';
import { ActionButtonProps } from '@/types/components/components.types';
import { AnimationsTableInstanceT } from '@/types/animation/animationTable.types';
import { Add, Delete, Merge, PlaylistAdd } from '@mui/icons-material';
import { Box } from '@mui/material';
import CreateDialog from '../../dialogs/CreateDialog/CreateDialog';
import DeleteDialog from '../../dialogs/DeleteDialog/DeleteDialog';
import ToolbarButton from '@/components/misc/ToolbarButton/ToolbarButton';

const ToolbarCustomActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
	const selectedRowIds = selectedRows.map((row) => row.id); // as string
	const isSelectionEmpty = !Object.keys(useAnimationsRowSelection()).length;

	const handlePlaylistChange = () => {
		// dispatch(getAnimationDetail({ _id: selectedRowIds }));
	};

	const actions: ActionButtonProps[] = [
		{
			text: 'Create',
			icon: <Add />,
			onClick: () => setIsCreateDialogOpen(true),
		},
		{
			text: 'Delete',
			icon: <Delete />,
			disabled: isSelectionEmpty,
			onClick: () => setIsDeleteDialogOpen(true),
		},
		{
			text: 'Select',
			icon: <PlaylistAdd />,
			disabled: isSelectionEmpty && true,
			onClick: handlePlaylistChange,
		},
		{
			text: 'Merge',
			icon: <Merge />,
			disabled: isSelectionEmpty,
			onClick: () => {},
		},
	];

	return (
		<>
			<CreateDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			<DeleteDialog
				selectedRows={selectedRows}
				open={isDeleteDialogOpen}
				setOpen={setIsDeleteDialogOpen}
			/>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{actions.map((actionProps) => (
					<ToolbarButton key={actionProps.text} {...actionProps} />
				))}
			</Box>
		</>
	);
};

export default ToolbarCustomActions;
