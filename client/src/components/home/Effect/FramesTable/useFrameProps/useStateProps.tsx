import { useDispatch } from 'react-redux';
import { useEffectsState } from '@/libs/redux/features/effects/state/selector';
import { AppDispatch } from '@/libs/redux/store';
import { EffectsTablePropsT } from '@/types/effect/effectTable.types';
import { effectsStateActions } from '@/libs/redux/features/effects/state/slice';
import { MRT_DensityState } from 'material-react-table';

const useStateProps = (): EffectsTablePropsT => {
	const dispatch = useDispatch<AppDispatch>();
	const state = useEffectsState();

	return {
		state,
		onDensityChange: (updater) => {
			dispatch(
				effectsStateActions.updateInternalState({
					key: 'density',
					value: updater as MRT_DensityState,
				}),
			);
		},
		onGlobalFilterChange: (updater) => {
			dispatch(
				effectsStateActions.updateInternalState({
					key: 'globalFilter',
					value: updater as string,
				}),
			);
		},
		onExpandedChange: (updater) => {
			const value = typeof updater === 'function' ? updater(state.expanded) : updater;

			dispatch(effectsStateActions.updateInternalState({ key: 'expanded', value }));
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.rowSelection);

				dispatch(effectsStateActions.updateInternalState({ key: 'rowSelection', value }));
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnFilters);

				dispatch(
					effectsStateActions.updateInternalState({ key: 'columnFilters', value }),
				);
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnVisibility);

				dispatch(
					effectsStateActions.updateInternalState({ key: 'columnVisibility', value }),
				);
			}
		},
		onColumnPinningChange: (updater) => {
			if (typeof updater === 'function') {
				const value = updater(state.columnPinning);

				dispatch(
					effectsStateActions.updateInternalState({ key: 'columnPinning', value }),
				);
			}
		},
	};
};

export default useStateProps;
