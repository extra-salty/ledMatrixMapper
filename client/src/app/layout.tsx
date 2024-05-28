import type { Metadata } from 'next';
import { Jura, Comfortaa } from 'next/font/google';
import { Paper } from '@mui/material';
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider';
import './_global.scss';

export const comfortaa = Comfortaa({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
});

export const jura = Jura({
	weight: ['300', '400', '500', '600', '700'],
	style: ['normal'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'LED Matrix Mapper',
	description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body className={jura.className}>
				<ThemeProvider themeMode='dark'>
					<Paper
						square
						elevation={1}
						sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
					>
						{children}
					</Paper>
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
