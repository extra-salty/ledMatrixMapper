import { useAnimationsState } from '@/libs/redux/features/animations/selectors';
import { isEqual } from 'lodash';
import {
	MRT_GlobalFilterTextField,
	MRT_ShowHideColumnsButton,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from 'material-react-table';
import { RestartAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { initialState } from '@/libs/redux/features/playlist/state/slice';
import { EffectsTableInstanceT } from '@/types/effect/effectTable.types';
import { effectsStateActions } from '@/libs/redux/features/effects/state/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';

const ToolbarInternalActions = ({ table }: { table: EffectsTableInstanceT }) => {
	const dispatch = useDispatch<AppDispatch>();

	const state = useAnimationsState();
	const isResetDisabled = isEqual(state, initialState);

	const handleReset = () => dispatch(effectsStateActions.resetState());

	return (
		<>
			{/* <MRT_GlobalFilterTextField table={table} /> */}
			<MRT_ToggleGlobalFilterButton table={table} />
			<MRT_ToggleFiltersButton table={table} />
			<MRT_ShowHideColumnsButton table={table} />
			<Tooltip title='Reset'>
				<span>
					<IconButton disabled={isResetDisabled} onClick={handleReset}>
						<RestartAlt />
					</IconButton>
				</span>
			</Tooltip>
		</>
	);
};

export default ToolbarInternalActions;
