'use client';
import { AppBar, Box } from '@mui/material';
import AppToolbar from './AppToolbar/AppToolbar';
import Logo from '../../misc/Logo/Logo';
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
			>
				<Logo />
			</Box>
			<AppToolbar />
		</AppBar>
	);
};

export default Header;
