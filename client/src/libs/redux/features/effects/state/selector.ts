import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useEffectsState = () =>
	useSelector((state: RootState) => state.effects.state.internal);
