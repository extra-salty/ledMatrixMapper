import { useDispatch } from 'react-redux';
import { useThemeMode } from '@/libs/redux/features/app/selector';
import { appActions } from '@/libs/redux/features/app/slice';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const ThemeToggle = () => {
	const dispatch = useDispatch();
	const themeMode = useThemeMode();
	const isDark = themeMode === 'dark';

	const handleThemeChange = () =>
		dispatch(appActions.setThemeMode(isDark ? 'light' : 'dark'));

	return (
		<Tooltip title={isDark ? 'Light mode' : 'Dark mode'}>
			<IconButton onClick={handleThemeChange}>
				{isDark ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
