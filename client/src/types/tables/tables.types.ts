import {
	MRT_ColumnDef,
	MRT_ColumnFiltersState,
	MRT_ColumnPinningState,
	MRT_DensityState,
	MRT_ExpandedState,
	MRT_Row,
	MRT_RowData,
	MRT_RowSelectionState,
	MRT_SortingState,
	MRT_TableInstance,
	MRT_TableOptions,
	MRT_VisibilityState,
} from 'material-react-table';

export type TableStateT = {
	isSaving: boolean;
	isLoading: boolean;
	expanded: MRT_ExpandedState;
	sorting: MRT_SortingState;
	rowSelection: MRT_RowSelectionState;
	columnVisibility: MRT_VisibilityState;
	columnFilters: MRT_ColumnFiltersState;
	columnPinning: MRT_ColumnPinningState;
	globalFilter: any;
	density: MRT_DensityState;
	isFullScreen: boolean;
};
export type TableRowT<T extends MRT_RowData> = MRT_Row<T>;
export type TablePropsT<T extends MRT_RowData> = Partial<MRT_TableOptions<T>>;
export type TableColumnsT<T extends MRT_RowData> = MRT_ColumnDef<T>;
export type TableColumnsPartialT<T extends MRT_RowData> = Partial<TableColumnsT<T>>;
export type TableInstanceT<T extends MRT_RowData> = MRT_TableInstance<T>;
