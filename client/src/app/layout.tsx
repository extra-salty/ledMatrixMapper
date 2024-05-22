import type { Metadata } from 'next';
import { Raleway, Roboto } from 'next/font/google';
import { Paper } from '@mui/material';
import ThemeProvider from '@/providers/ThemeProvider/ThemeProvider';
import './_global.scss';

export const raleway = Raleway({
	weight: ['300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
});

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'LED Matrix Mapper',
	description: '',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body className={roboto.className}>
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
