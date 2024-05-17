import useCommonTableStylingProps from '@/components/misc/commonTableProps/useCommonTableStylingProps';
import { EffectsTablePropsT, EffectsTableRowT } from '@/types/effects/effectTable.types';
import { darken, lighten } from '@mui/material/styles';

const useStylingProps = (): EffectsTablePropsT => {
	// const focusedRowId = usePlaylistFocusedRow();
	const commonProps = useCommonTableStylingProps<EffectsTableRowT>();

	return {
		...commonProps,
		muiTableBodyRowProps: ({ row }) => {
			// const isRowFocused = !!focusedRowId && rowId === focusedRowId;

			return {
				sx: (theme) => ({
					td: {
						backgroundColor: false
							? lighten(theme.palette.background.paper, 0.25)
							: darken(
									lighten(theme.palette.background.paper, 0.1),
									row.depth * (theme.palette.mode === 'dark' ? 0.2 : 0.1),
							  ),
					},
					'td[data-pinned="true"]::before': {
						backgroundColor: 'inherit',
					},
				}),
			};
		},
	};
};

export default useStylingProps;
