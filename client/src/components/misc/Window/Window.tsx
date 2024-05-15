'use client';
import { Box, Paper } from '@mui/material';
import MatrixLogo from '../Logo2/MatrixLogo';

const Window = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box
			sx={{
				height: '100vh',
				minWidth: '500px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Paper
				elevation={10}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '450px',
					padding: '25px 50px 10px 50px',
				}}
			>
				<MatrixLogo />
				<Box
					component='main'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '30px',
						marginTop: '40px',
					}}
				>
					{children}
				</Box>
			</Paper>
		</Box>
	);
};

export default Window;
