import { useApp_temp } from '../useApp_temp/useApp_temp';
import { Routes, useRoutes } from '../../misc/hooks/useRoutes/useRoutes';
import { createContext, useEffect } from 'react';
import { User } from 'realm-web';

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const app = useApp_temp();
	const user = app.currentUser;

	const goToLogin = useRoutes(Routes.Login);

	// add logout, similar to AppProvider-login

	// redo
	useEffect(() => {
		if (!user) {
			goToLogin();
		}
	}, [goToLogin, user]);

	return (
		<>
			{user ? <UserContext.Provider value={user}>{children}</UserContext.Provider> : null}
		</>
	);
};

export default UserProvider;
