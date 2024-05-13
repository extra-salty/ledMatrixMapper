import { TablePropsT } from '@/types/tables/tables.types';
import { MRT_RowData } from 'material-react-table';

const useCommonTableStylingProps = <T extends MRT_RowData>(): TablePropsT<T> => {
	return {
		muiTablePaperProps: {
			sx: {
				height: '100%',
				width: '100%',
			},
		},
		muiTopToolbarProps: {
			sx: {
				borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
				// padding: '0px 8px',
				height: '48px',
			},
		},
		muiTableContainerProps: ({ table }) => {
			const topToolbarHeight = table.refs.topToolbarRef.current?.offsetHeight || 0;
			const bottomToolbarHeight = table.refs.bottomToolbarRef.current?.offsetHeight || 0;
			const overallHeight = topToolbarHeight + bottomToolbarHeight;

			return {
				sx: {
					height: `calc(100% - ${overallHeight}px)`,
				},
			};
		},
		muiTableBodyCellProps: {
			sx: {
				color: '#FFFFFFD0',
			},
		},
		muiTableHeadCellProps: {
			sx: {
				display: 'flex',
				alignItems: 'center',
				// 'Mui-TableHeadCell-Content-Wrapper': {sx:  {
				//   {
				//     display: 'flex',
				//     alignItems: 'center',
				//   },
				// }}
			},
		},
		muiFilterDateTimePickerProps: ({ table, column }) => {
			return {
				sx: {
					// width: '100%',
				},
			};
		},
	} as TablePropsT<T>;
};

export default useCommonTableStylingProps;
