'use client';
import useTheme from './useTheme';
import { ThemeModeT } from '@/libs/redux/features/app/appSlice.types';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import {
	StyledEngineProvider,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

const ThemeProvider = ({
	themeMode,
	children,
}: {
	themeMode: ThemeModeT;
	children: React.ReactNode;
}) => {
	const theme = useTheme(themeMode);

	return (
		<MUIThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<AppRouterCacheProvider>
					<SnackbarProvider
						anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
						autoHideDuration={2000}
					>
						{children}
					</SnackbarProvider>
				</AppRouterCacheProvider>
			</StyledEngineProvider>
		</MUIThemeProvider>
	);
};

export default ThemeProvider;
