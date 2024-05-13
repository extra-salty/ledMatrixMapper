import { ThemeModeT } from '@/libs/redux/features/app/appSlice.types';
import { Theme, createTheme } from '@mui/material';
import LinkBehavior from '@/components/misc/LinkBehaviour/LinkBehaviour';

const useTheme = (themeMode: ThemeModeT): Theme => {
	return createTheme({
		palette: {
			mode: themeMode,
			// background: {default: '',}
			primary: {
				main: '#FFFFFFDD',
				light: '#42a5f5',
				dark: 'FFFFFFDD',
				contrastText: 'FFFFFFDD',
			},
		},
		spacing: 4,
		breakpoints: {
			values: {
				xs: 450,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1600,
			},
		},
		typography: {
			fontFamily: 'inherit',
			button: {
				textTransform: 'none',
			},
		},
		components: {
			MuiUseMediaQuery: {
				defaultProps: {
					noSsr: true,
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						padding: '6px 8px',
					},
					startIcon: {
						marginInline: '4px',
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					root: {
						minHeight: '0px',
						paddingBlock: '8px',
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					root: {
						minHeight: '0px',
						borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
					},
				},
			},
			MuiLink: {
				defaultProps: {
					component: LinkBehavior,
				},
			},
			MuiButtonBase: {
				defaultProps: {
					LinkComponent: LinkBehavior,
				},
			},
		},
	});
};

export default useTheme;
