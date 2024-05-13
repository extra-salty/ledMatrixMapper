import { useState } from 'react';
import { ActionButtonProps } from '@/types/components/components.types';
import { Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { EffectsTableInstanceT } from '@/types/effects/effectTable.types';
import ToolbarButton from '@/components/misc/ToolbarButton/ToolbarButton';
import CreateDialog from '../../dialogs/CreateDialog/CreateDialog';

const ToolbarCustomActions = ({ table }: { table: EffectsTableInstanceT }) => {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

	const actions: ActionButtonProps[] = [
		{
			text: 'Create',
			icon: <Add />,
			onClick: () => setIsCreateDialogOpen(true),
		},
	];

	return (
		<>
			<CreateDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
			{/* <DeleteDialog
				selectedRows={selectedRows}
				open={isDeleteDialogOpen}
				setOpen={setIsDeleteDialogOpen}
			/> */}
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				{actions.map((actionProps) => (
					<ToolbarButton key={actionProps.text} {...actionProps} />
				))}
			</Box>
		</>
	);
};

export default ToolbarCustomActions;
