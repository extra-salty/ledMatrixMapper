import { useApp_temp } from '@/providers/useApp_temp/useApp_temp';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import { Routes } from '@/misc/hooks/useRoutes/useRoutes';
import styles from './MatrixLogo.module.scss';

const BigLogo = () => {
	const logoLetters: string[] = ['L', 'E', 'D', 'M', 'A', 'T', 'R', 'I', 'X'];
	const mapperLetters: string[] = ['M', 'A', 'P', 'P', 'E', 'R'];

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
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(3, 1fr)',
						gridTemplateRows: 'repeat(3, 1fr)',
					}}
				>
					{logoLetters.map((letter, i) => (
						<div key={i} className={styles.cell}>
							{letter}
						</div>
					))}
				</Box>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
					{mapperLetters.map((letter) => (
						<Typography key={letter} fontWeight={600} sx={{ color: 'white' }}>
							{letter}
						</Typography>
					))}
				</Box>
			</Box>
		</Link>
	);
};

export default BigLogo;

{
	/* <a href={user ? Routes.Home : Routes.Login}> */
}
