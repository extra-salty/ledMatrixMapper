import { memo } from 'react';
import useConvertedData from './usePlaylistProps/useConvertedData';
import useColumns from './usePlaylistProps/useColumns';
import useStateProps from './usePlaylistProps/useStateProps';
import useComponentProps from './usePlaylistProps/useComponentProps';
import useStylingProps from './usePlaylistProps/useStylingProps';
import useDraggingProps from './usePlaylistProps/useDraggingProps';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

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
		positionToolbarAlertBanner: 'bottom',
		columnResizeMode: 'onEnd',
		layoutMode: 'grid-no-grow',
		enableEditing: true,
		editDisplayMode: 'table',
		//
		defaultColumn: {
			minSize: 28,
			size: 24,
			maxSize: 200,
		},
		displayColumnDefOptions: {
			'mrt-row-select': {
				size: 28,
				grow: false,
				enableResizing: false,
				enablePinning: false,
				visibleInShowHideMenu: false,
			},
			'mrt-row-expand': {
				visibleInShowHideMenu: false,
			},
			'mrt-row-drag': {
				header: 'Drag',
				size: 40,
				minSize: 40,
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
