import useCommonTableStylingProps from '@/components/misc/commonTableProps/useCommonTableStylingProps';
import { usePlaylistFocusedRow } from '@/libs/redux/features/playlist/state/selectors';
import {
	AnimationTableRowT,
	AnimationsTablePropsT,
} from '@/types/animation/animationTable.types';
import { darken, lighten } from '@mui/material/styles';

const useStylingProps = (): AnimationsTablePropsT => {
	const focusedRowId = usePlaylistFocusedRow();
	const commonProps = useCommonTableStylingProps<AnimationTableRowT>();

	return {
		...commonProps,
		muiTablePaperProps: ({ table }) => {
			const isFullscreen = table.getState().isFullScreen;

			return {
				sx: {
					height: '100%',
					paddingTop: isFullscreen ? '80px !important' : 'inherit',
				},
			};
		},
		muiTableBodyRowProps: ({ row }) => {
			const isDisabled = row.original.disabled;
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
					opacity: isDisabled ? '0.5' : 'inherit',
					'td[data-pinned="true"]::before': {
						backgroundColor: 'inherit',
					},
				}),
			};
		},
	};
};

export default useStylingProps;
