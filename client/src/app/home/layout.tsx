'use client';
import UserProvider from '@/providers/UserProvider/UserProvider';
import DatabaseProvider from '@/providers/DatabaseProvider/DatabaseProvider';
import StateProvider from '@/providers/StateProvider/StateProvider';
import ThemeProviderWrapper from '@/providers/ThemeProvider/ThemeProviderWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '@/components/home/Header/Header';
import Main from '@/components/home/layout/Main/Main';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserProvider>
			<DatabaseProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<StateProvider>
						<ThemeProviderWrapper>
							<Header />
							<Main>{children}</Main>
						</ThemeProviderWrapper>
					</StateProvider>
				</LocalizationProvider>
			</DatabaseProvider>
		</UserProvider>
	);
};

export default HomeLayout;
