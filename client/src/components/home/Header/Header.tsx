'use client';
import { AppBar, Box } from '@mui/material';
import AppToolbar from './AppToolbar/AppToolbar';
import DeviceToolbar from './DeviceToolbar/DeviceToolbar';

const Header = () => {
	return (
		<AppBar
			elevation={4}
			sx={{
				height: '80px',
				position: 'relative',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			<DeviceToolbar />
			<Box
				sx={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			></Box>
			<AppToolbar />
		</AppBar>
	);
};

export default Header;
