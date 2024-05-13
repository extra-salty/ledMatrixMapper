import { Dispatch, SetStateAction } from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import NumberInput from '@/components/misc/NumberInput/NumberInput';

const DeviceDrawer = ({
	isOpen,
	setOpen,
}: {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Drawer
			anchor='left'
			open={isOpen}
			onClose={() => setOpen(false)}
			PaperProps={{
				sx: {
					width: '350px',
					padding: '50px',
				},
			}}
			sx={{
				zIndex: '2000 !important',
			}}
		>
			<Typography variant='h4' sx={{ marginBottom: '25px' }}>
				Device Setttings
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				<Typography variant='h6' sx={{}}>
					IP Address:
				</Typography>
				<Box sx={{ display: 'flex', width: '160px' }}>
					{Array.from(Array(4)).map((_, i) => {
						return (
							<NumberInput
								key={i}
								min={1}
								max={255}
								controlledValue={255}
								incrementAlwaysVisible
								hasIncrements
							/>
						);
					})}
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					flexGrow: '1',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '25px',
						alignItems: 'center',
					}}
				></Box>
			</Box>
		</Drawer>
	);
};

export default DeviceDrawer;
