import useDeleteTableColumns from './useDeleteTableColumns';
import { Dispatch, SetStateAction } from 'react';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import {
	MRT_RowSelectionState,
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';

const DeleteTable = ({
	data,
	rowSelection,
	setSelection,
}: {
	data: AnimationTableRowT[];
	rowSelection: MRT_RowSelectionState;
	setSelection: Dispatch<SetStateAction<MRT_RowSelectionState>>;
}) => {
	const columns = useDeleteTableColumns();

	const table = useMaterialReactTable({
		data,
		columns,
		state: { columnVisibility: { _id: false, description: false }, rowSelection },
		onRowSelectionChange: setSelection,
		getRowId: (row) => row.id || '',
		rowNumberDisplayMode: 'static',
		positionToolbarAlertBanner: 'bottom',
		enableStickyHeader: true,
		enableTopToolbar: false,
		enableToolbarInternalActions: false,
		enablePagination: false,
		enableColumnActions: false,
		enableRowNumbers: true,
		enableRowSelection: true,
		// enableBatchRowSelection: true,
		defaultColumn: {
			minSize: 24,
			size: 24,
			maxSize: 200,
		},
		displayColumnDefOptions: {
			'mrt-row-select': {
				size: 28,
			},
			'mrt-row-numbers': {
				size: 24,
			},
		},
	});

	return <MaterialReactTable table={table} />;
};

export default DeleteTable;
