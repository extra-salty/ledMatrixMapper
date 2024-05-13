import { useState } from 'react';
import { IconButton, Toolbar } from '@mui/material';
import { Settings } from '@mui/icons-material';
import Connect from '../AppToolbar/Connect/Connect';
import Speakers from '../AppToolbar/Speakers/Speakers';
import DeviceDrawer from './DeviceDrawer/DeviceDrawer';

const DeviceToolbar = () => {
	const [isDeviceDrawerOpen, setIsDeviceDrawerOpen] = useState<boolean>(false);

	const handleDrawerOpen = () => setIsDeviceDrawerOpen(true);

	return (
		<Toolbar
			sx={{
				position: 'absolute',
				left: '25px',
			}}
			disableGutters
		>
			<DeviceDrawer isOpen={isDeviceDrawerOpen} setOpen={setIsDeviceDrawerOpen} />
			<IconButton onClick={handleDrawerOpen}>
				<Settings />
			</IconButton>
			<Connect />
			<Speakers deviceConnected={false} />
		</Toolbar>
	);
};

export default DeviceToolbar;
