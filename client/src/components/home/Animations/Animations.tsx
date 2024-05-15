import { memo } from 'react';
import useConvertedData from './useAnimationsProps/useConvertedData';
import useColumns from './useAnimationsProps/useColumns';
import useStateProps from './useAnimationsProps/useStateProps';
import useComponentProps from './useAnimationsProps/useComponentProps';
import useStylingProps from './useAnimationsProps/useStylingProps';
import useDraggingProps from './useAnimationsProps/useDraggingProps';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const Animations = () => {
	const data = useConvertedData();
	const columns = useColumns();

	const stateProps = useStateProps();
	const componentProps = useComponentProps();
	const stylingProps = useStylingProps();
	const draggingProps = useDraggingProps();

	const table = useMaterialReactTable({
		data,
		columns,
		...stateProps,
		...componentProps,
		...stylingProps,
		...draggingProps,
		enablePagination: false,
		enableStickyHeader: true,
		enableFacetedValues: true,
		enableColumnFilterModes: true,
		enableColumnResizing: true,
		enableColumnPinning: true,
		enableColumnDragging: false,
		enableRowNumbers: false,
		enableSubRowSelection: false,
		enableExpanding: true,
		enableMultiSort: true,
		enableSortingRemoval: true,
		rowNumberDisplayMode: 'static',
		positionToolbarAlertBanner: 'bottom',
		layoutMode: 'grid-no-grow',
		columnResizeMode: 'onEnd',
		displayColumnDefOptions: {
			'mrt-row-select': {
				size: 40,
				grow: false,
				enablePinning: false,
				enableResizing: false,
				visibleInShowHideMenu: false,
			},
			'mrt-row-expand': {
				visibleInShowHideMenu: false,
			},
			'mrt-row-actions': {
				size: 40,
				visibleInShowHideMenu: false,
			},
		},
		// getRowId: (row) => row.id,
		getSubRows: (row) => row.children,
	});

	return <MaterialReactTable table={table} />;
};

export default memo(Animations);
