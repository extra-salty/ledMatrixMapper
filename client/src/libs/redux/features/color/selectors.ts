import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useSelectedColor = () =>
	useSelector((state: RootState) => state.color.selectedColor);
