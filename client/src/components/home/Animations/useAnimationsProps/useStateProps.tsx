import { useDispatch } from 'react-redux';
import { useAnimationsState } from '@/libs/redux/features/animations/selectors';
import { MRT_DensityState } from 'material-react-table';
import { AnimationsTablePropsT } from '@/types/animation/animationTable.types';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { animationsActions } from '@/libs/redux/features/animations/slice';

const useStateProps = (): AnimationsTablePropsT => {
	const dispatch = useDispatch();
	const state = useAnimationsState();

	return {
		state,
		onDensityChange: (updater) => {
			dispatch(
				animationsActions.updateInternalState({
					key: 'density',
					value: updater as MRT_DensityState,
				}),
			);
		},
		onIsFullScreenChange: (updater) => {
			dispatch(
				animationsActions.updateInternalState({
					key: 'isFullScreen',
					value: updater as boolean,
				}),
			);
		},
		onGlobalFilterChange: (updater) => {
			dispatch(
				animationsActions.updateInternalState({
					key: 'globalFilter',
					value: updater as string,
				}),
			);
		},
		onExpandedChange: (updater) => {
			const value = typeof updater === 'function' ? updater(state.expanded) : updater;

			dispatch(animationsActions.updateInternalState({ key: 'expanded', value }));
		},
		enableRowSelection: (row) => row.original.type === AnimationChildrenTypesT.animation,
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.rowSelection);

				dispatch(animationsActions.updateInternalState({ key: 'rowSelection', value }));
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.sorting);

				dispatch(animationsActions.updateInternalState({ key: 'sorting', value }));
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnFilters);

				dispatch(animationsActions.updateInternalState({ key: 'columnFilters', value }));
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnVisibility);

				dispatch(
					animationsActions.updateInternalState({ key: 'columnVisibility', value }),
				);
			}
		},
		onColumnPinningChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnPinning);

				dispatch(animationsActions.updateInternalState({ key: 'columnPinning', value }));
			}
		},
	};
};

export default useStateProps;
