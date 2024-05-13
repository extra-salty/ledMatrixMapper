import { Box, Divider, Toolbar } from '@mui/material';
import Connect from './Connect/Connect';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import GitHub from './GitHub/GitHub';
import AccountMenu from './AccountMenu/AccountMenu';

const AppToolbar = () => {
	return (
		<Toolbar
			sx={{
				position: 'absolute',
				right: '25px',
			}}
			disableGutters
		>
			<Box sx={{ display: 'flex', alignItems: 'center', paddingInline: '12px' }}>
				<ThemeToggle />
				<GitHub />
			</Box>
			<AccountMenu />
		</Toolbar>
	);
};

export default AppToolbar;
