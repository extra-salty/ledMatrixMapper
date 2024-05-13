import usePasswordStrength from './usePasswordStrength';
import { Dispatch, SetStateAction } from 'react';
import { Box, Popover, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import PasswordRequirements from './PasswordRequirements/PasswordRequirements';
import PasswordHint from './PasswordHint/PasswordHint';

const PasswordStrength = ({
	anchorEl,
	password,
	setError,
}: {
	anchorEl: Element | null;
	password: string;
	setError: Dispatch<SetStateAction<string>>;
}) => {
	const open = Boolean(anchorEl);
	const id = open ? 'password strength' : undefined;

	const { result, resultDetail } = usePasswordStrength(password);
	const value = 20 + (result?.score || 0) * 20;

	return (
		<Popover
			elevation={20}
			id={id}
			open={open}
			disableAutoFocus={true}
			disableEnforceFocus={true}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			slotProps={{
				paper: {
					style: {
						width: anchorEl?.clientWidth || 0,
						padding: '15px',
						backgroundImage: 'none',
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
					},
				},
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
				<LinearProgress variant='determinate' color={resultDetail.color} value={value} />
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography>Weak</Typography>
					<Typography>Strong</Typography>
				</Box>
				<PasswordRequirements password={password} setError={setError} />
				{result && <PasswordHint password={password} result={result} />}
			</Box>
		</Popover>
	);
};

export default PasswordStrength;
