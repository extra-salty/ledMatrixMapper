import { memo } from 'react';
import useColumns from './useEffectsProps/useColumns';
import useConvertedData from './useEffectsProps/useConvertedData';
import useStylingProps from './useEffectsProps/useStylingProps';
import useStateProps from './useEffectsProps/useStateProps';
import useComponentProps from './useEffectsProps/useComponentProps';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { EffectsTableColumnsPartialT } from '@/types/effects/effectTable.types';

const Effects = () => {
	const data = useConvertedData();
	const columns = useColumns();

	const stateProps = useStateProps();
	const componentProps = useComponentProps();
	const stylingProps = useStylingProps();

	const table = useMaterialReactTable({
		data,
		columns,
		...stateProps,
		...componentProps,
		...stylingProps,
		enablePagination: false,
		enableStickyHeader: true,
		enableEditing: true,
		autoResetExpanded: true,
		enableExpanding: true,
		enableExpandAll: true,
		enableFilterMatchHighlighting: true,
		enableRowSelection: true,
		enableFilters: true,
		enableColumnPinning: true,
		enableColumnResizing: true,
		columnResizeMode: 'onEnd',
		layoutMode: 'grid-no-grow',
		editDisplayMode: 'table',
		positionToolbarAlertBanner: 'bottom',

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
			'mrt-row-drag': {
				header: 'Drag',
				enablePinning: false,
				enableResizing: false,
				grow: false,
				visibleInShowHideMenu: false,
			},
		},
		// getRowId: (row) => row.rowId,
		getSubRows: (row) => row.effects,
	});

	return <MaterialReactTable table={table} />;
};

export default Effects;
