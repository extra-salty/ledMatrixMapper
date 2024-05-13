import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const useThemeMode = () => useSelector((state: RootState) => state.app.themeMode);

export const useActiveMainTab = () =>
	useSelector((state: RootState) => state.app.activeMainTab);

export const useActiveAnimationCreatorTabs = () =>
	useSelector((state: RootState) => state.app.activeAnimationCreatorTabs);
