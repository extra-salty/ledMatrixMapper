'use client';
import { useRouter } from 'next/navigation';
import { Routes, useRoutes } from '../../misc/hooks/useRoutes/useRoutes';
import { createContext } from 'react';
import { App, Credentials, getApp } from 'realm-web';

type AppT = { app: App; login: (credentials: Credentials) => Promise<void> };

export const AppContext = createContext<AppT>({
	app: getApp(process.env.NEXT_PUBLIC_MONGO_APP_ID),
	login: async () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const app = getApp(process.env.NEXT_PUBLIC_MONGO_APP_ID);
	const user = app.currentUser;
	const router = useRouter();

	const goToHome = useRoutes(Routes.Home);

	if (user) goToHome();

	const value: AppT = {
		app,
		login: async (credentials: Credentials) => {
			// Router.replace('/any-route'); // clear history

			await app.logIn(credentials);
			goToHome();
		},
	};

	return (
		<>
			{user ? null : <AppContext.Provider value={value}>{children}</AppContext.Provider>}
		</>
	);
};

export default AppProvider;
