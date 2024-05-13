import { RootState } from '@/libs/redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useSelectedColor = () =>
	useSelector((state: RootState) => state.color.selectedColor);
