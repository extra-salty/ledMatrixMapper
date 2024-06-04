import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useFrameCellSize = () =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.cellSize);

export const useEffectPlayerOptions = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions);

export const useEffectPlayerRepeat = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.repeatEnabled);

export const useEffectPlayerRefreshRate = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.refreshRate);

export const useEffectPlayerBorder = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.borderEnabled);
