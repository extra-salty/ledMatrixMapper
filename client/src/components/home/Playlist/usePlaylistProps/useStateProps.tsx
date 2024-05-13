import { useDispatch } from 'react-redux';
import { usePlaylistInternalState } from '@/libs/redux/features/playlist/state/selectors';
import { MRT_DensityState } from 'material-react-table';
import { AppDispatch } from '@/libs/redux/store';
import { playlistStateActions } from '@/libs/redux/features/playlist/state/slice';
import { AnimationsTablePropsT } from '@/types/animation/animationTable.types';

const useStateProps = (): AnimationsTablePropsT => {
	const dispatch = useDispatch<AppDispatch>();
	const state = usePlaylistInternalState();

	return {
		state,
		onDensityChange: (updater) => {
			dispatch(
				playlistStateActions.updateInternalState({
					key: 'density',
					value: updater as MRT_DensityState,
				}),
			);
		},
		onIsFullScreenChange: (updater) => {
			dispatch(
				playlistStateActions.updateInternalState({
					key: 'isFullScreen',
					value: updater as boolean,
				}),
			);
		},
		onGlobalFilterChange: (updater) => {
			dispatch(
				playlistStateActions.updateInternalState({
					key: 'globalFilter',
					value: updater as string,
				}),
			);
		},
		onExpandedChange: (updater) => {
			const value = typeof updater === 'function' ? updater(state.expanded) : updater;

			dispatch(playlistStateActions.updateInternalState({ key: 'expanded', value }));
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.rowSelection);

				dispatch(
					playlistStateActions.updateInternalState({ key: 'rowSelection', value }),
				);
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnFilters);

				dispatch(
					playlistStateActions.updateInternalState({ key: 'columnFilters', value }),
				);
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnVisibility);

				dispatch(
					playlistStateActions.updateInternalState({ key: 'columnVisibility', value }),
				);
			}
		},
		onColumnPinningChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnPinning);

				dispatch(
					playlistStateActions.updateInternalState({ key: 'columnPinning', value }),
				);
			}
		},
	};
};

export default useStateProps;
