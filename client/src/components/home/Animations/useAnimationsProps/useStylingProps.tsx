import useCommonTableStylingProps from '@/components/misc/commonTableProps/useCommonTableStylingProps';
import {
	AnimationTableRowT,
	AnimationsTablePropsT,
} from '@/types/animation/animationTable.types';
import { darken, lighten } from '@mui/material/styles';

const useStylingProps = (): AnimationsTablePropsT => {
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
		muiTableBodyRowProps: ({ table, row }) => {
			// const isAnimation = !!row.original._id;

			return {
				sx: (theme) => ({
					td: {
						backgroundColor: darken(
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
