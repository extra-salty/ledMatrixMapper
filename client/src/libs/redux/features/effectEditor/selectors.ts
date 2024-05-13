import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useFrameWidth = () =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.frameWidth);

export const useEffectPlayerOptions = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions);

export const useEffectPlayerRepeat = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.repeatEnabled);

export const useEffectPlayerBorder = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.borderEnabled);
