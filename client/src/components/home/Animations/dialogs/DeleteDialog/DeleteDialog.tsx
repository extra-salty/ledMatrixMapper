import useSWRMutation from 'swr/mutation';
import { useDatabase } from '@/providers/DatabaseProvider/useDatabase';
import { useDispatch } from 'react-redux';
import { Dispatch, SetStateAction, memo, useState } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { MRT_RowSelectionState } from 'material-react-table';
import { getAnimations } from '@/libs/redux/features/animations/thunk';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { LoadingButton } from '@mui/lab';
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fade,
} from '@mui/material';
import DeleteTable from './DeleteTable/DeleteTable';
import { animationsActions } from '@/libs/redux/features/animations/slice';

const DeleteDialog = ({
	open,
	setOpen,
	selectedRows,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	selectedRows: AnimationTableRowT[];
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const { animations } = useDatabase();

	const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
	const isAcceptDisabled = !Object.values(rowSelection).includes(true);

	const handleDelete = async (_: string) => {
		const ids = Object.keys(rowSelection);

		const result = await animations.delete(ids);
		handleClose();
		dispatch(getAnimations());
	};

	const { isMutating, error, trigger, reset } = useSWRMutation(
		'/animations/delete',
		handleDelete,
		{
			onError: (e) => console.error(e),
		},
	);

	const handleClose = () => {
		setOpen(false);
		reset();
		setRowSelection({});
		dispatch(animationsActions.updateInternalState({ key: 'rowSelection', value: {} }));
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{'Delete the following animation(s)'}:</DialogTitle>
			<DialogContent dividers>
				<DeleteTable
					data={selectedRows}
					rowSelection={rowSelection}
					setSelection={setRowSelection}
				/>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' autoFocus onClick={handleClose}>
					Cancel
				</Button>
				<Fade in={error}>
					<Alert severity='error' variant='outlined'>
						Deletion failed.
					</Alert>
				</Fade>
				<LoadingButton
					variant='outlined'
					loading={isMutating}
					disabled={isAcceptDisabled}
					onClick={() => trigger()}
				>
					Accept
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default memo(DeleteDialog);
