'use client';
import { useEffect } from 'react';
import { initializeBackground } from '@/misc/background/initializeBackground';
import AppProvider from '@/providers/AppProvider/AppProvider';
import Script from 'next/script';
import { Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import UserLayoutFooter from '@/components/user/UserLayoutFooter/UserLayoutFooter';
import MatrixLogo from '@/components/misc/Logo2/MatrixLogo';

declare global {
	interface Window {
		FinisherHeader: any;
	}
}

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	const theme = useTheme();

	const minWidth700 = useMediaQuery('(min-width:700px)', { noSsr: false });

	useEffect(() => {
		return () => {
			const script = document.querySelector("script[src='/finisher-header.es5.min.js']");
			if (script) script.remove();
		};
	}, []);

	return (
		<AppProvider>
			<Script
				src='/finisher-header.es5.min.js'
				strategy='afterInteractive'
				onReady={() => initializeBackground()}
			/>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					position: 'relative',
					zIndex: 0,
				}}
				className='finisher-header'
			>
				<Box>
					<Paper
						square={true}
						elevation={10}
						sx={{
							backgroundImage: 'none',
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
							height: '100%',
							minWidth: '380px',
							width: minWidth700 ? '550px' : '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxSizing: 'border-box',
							[theme.breakpoints.down(450)]: {
								padding: '30px',
							},
							[theme.breakpoints.up(450)]: {
								padding: '60px',
							},
							[theme.breakpoints.up(600)]: {
								padding: '100px',
							},
							[theme.breakpoints.up(700)]: {
								padding: '80px',
							},
						}}
					>
						<MatrixLogo />
						<Box
							component='main'
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignSelf: 'normal',
								gap: '30px',
							}}
						>
							{children}
						</Box>
						<UserLayoutFooter />
					</Paper>
				</Box>
			</div>
		</AppProvider>
	);
};

export default UserLayout;
