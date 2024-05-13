import { useDispatch } from 'react-redux';
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
import { AnimationsTableInstanceT } from '@/types/animation/animationTable.types';
import { RestartAlt } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { animationsActions, initialState } from '@/libs/redux/features/animations/slice';

const ToolbarInternalActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const dispatch = useDispatch();
	const state = useAnimationsState();

	const isResetDisabled = isEqual(state, initialState.state);
	const isFullscreen = table.getState().isFullScreen;

	const handleReset = () => dispatch(animationsActions.resetState());

	return (
		<>
			<MRT_ToggleGlobalFilterButton table={table} />
			<MRT_ToggleFiltersButton table={table} />
			<MRT_ShowHideColumnsButton table={table} />
			<MRT_ToggleDensePaddingButton table={table} />
			<Tooltip title='Reset'>
				<span>
					<IconButton disabled={isResetDisabled} onClick={handleReset}>
						<RestartAlt />
					</IconButton>
				</span>
			</Tooltip>
			<MRT_ToggleFullScreenButton
				table={table}
				color={isFullscreen ? 'info' : 'default'}
			/>
		</>
	);
};

export default ToolbarInternalActions;
