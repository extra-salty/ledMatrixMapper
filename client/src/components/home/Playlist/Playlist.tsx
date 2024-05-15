import { memo } from 'react';
import useConvertedData from './usePlaylistProps/useConvertedData';
import useColumns from './usePlaylistProps/useColumns';
import useStateProps from './usePlaylistProps/useStateProps';
import useComponentProps from './usePlaylistProps/useComponentProps';
import useStylingProps from './usePlaylistProps/useStylingProps';
import useDraggingProps from './usePlaylistProps/useDraggingProps';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Height } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Playlist = () => {
	const { tableData } = useConvertedData();
	const columns = useColumns();

	const stateProps = useStateProps();
	const componentProps = useComponentProps();
	const stylingProps = useStylingProps();
	const draggingProps = useDraggingProps();

	const table = useMaterialReactTable({
		data: tableData,
		columns,
		...stateProps,
		...componentProps,
		...stylingProps,
		...draggingProps,
		enablePagination: false,
		enableStickyHeader: true,
		enableSorting: false,
		enableRowNumbers: false,
		enableColumnResizing: true,
		// autoResetExpanded: true,
		enableExpanding: true,
		enableExpandAll: true,
		enableRowSelection: true,
		enableFilters: false,
		enableGlobalFilter: true,
		enableColumnPinning: true,
		enableColumnActions: false,
		enableEditing: true,
		positionToolbarAlertBanner: 'bottom',
		columnResizeMode: 'onEnd',
		layoutMode: 'grid-no-grow',
		editDisplayMode: 'table',
		displayColumnDefOptions: {
			'mrt-row-select': {
				size: 40,
				grow: false,
				enableResizing: false,
				enablePinning: false,
				visibleInShowHideMenu: false,
			},
			'mrt-row-expand': {
				visibleInShowHideMenu: false,
			},
			'mrt-row-drag': {
				header: 'Move',
				Header: () => (
					<Tooltip title='Move'>
						<Height />
					</Tooltip>
				),
				size: 40,
				grow: false,
				enableResizing: false,
				enablePinning: false,
				visibleInShowHideMenu: false,
			},
		},
		// getRowId: (row) => row.rowId,
		getSubRows: (row) => row.children,
	});

	return <MaterialReactTable table={table} />;
};

export default memo(Playlist);
