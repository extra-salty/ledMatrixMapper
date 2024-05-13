import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useAnimationsData = () =>
	useSelector((state: RootState) => state.animations.data);

export const useAnimationsState = () =>
	useSelector((state: RootState) => state.animations.state.internal);

export const useAnimationsRowSelection = () =>
	useSelector((state: RootState) => state.animations.state.internal.rowSelection);

export const useAnimationsFocusedRow = () =>
	useSelector((state: RootState) => state.animations.state.focusedRow);
