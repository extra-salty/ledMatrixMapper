import { useApp_temp } from '@/providers/useApp_temp/useApp_temp';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import styles from './MatrixLogo.module.scss';
import { Routes } from '@/misc/hooks/useRoutes/useRoutes';

const MatrixLogo = () => {
	const logoLetters: string[] = ['L', 'E', 'D', 'M', 'A', 'T', 'R', 'I', 'X'];

	const minHeight700 = useMediaQuery('(min-height:700px)', { noSsr: false });

	const app = useApp_temp();
	const user = app.currentUser;

	return (
		<Link href={user ? Routes.Home : Routes.Login} underline='none' target='_self'>
			<Box
				component='header'
				sx={{
					display: minHeight700 ? 'flex' : 'none',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div className={styles.grid}>
					{logoLetters.map((letter, i) => (
						<div key={i} className={styles.cell}>
							{letter}
						</div>
					))}
				</div>
				<Typography fontWeight={600} letterSpacing={'5px'} sx={{ color: 'white' }}>
					MAPPER
				</Typography>
			</Box>
		</Link>
	);
};

export default MatrixLogo;
