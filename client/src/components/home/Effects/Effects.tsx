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

	const staticProps: EffectsTableColumnsPartialT = {
		enablePinning: false,
		enableResizing: false,
		grow: false,
		visibleInShowHideMenu: false,
	};

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
		defaultColumn: {
			minSize: 28,
			size: 28,
			maxSize: 200,
		},
		displayColumnDefOptions: {
			'mrt-row-select': {
				size: 28,
				...staticProps,
			},
			'mrt-row-expand': {
				visibleInShowHideMenu: false,
			},
			'mrt-row-drag': {
				header: 'Drag',
				size: 40,
				minSize: 40,
				...staticProps,
			},
		},
		// getRowId: (row) => row.rowId,
		getSubRows: (row) => row.effects,
	});

	return <MaterialReactTable table={table} />;
};

export default Effects;
