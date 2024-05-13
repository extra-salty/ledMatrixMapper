import { useContext } from 'react';
import { UserContext } from './UserProvider';
import { Routes, useRoutes } from '../../misc/hooks/useRoutes/useRoutes';

export const useUser = () => {
	const user = useContext(UserContext);

	const goToLogin = useRoutes(Routes.Login);

	if (!user) {
		goToLogin();
		throw new Error('No active user found. Redirecting to login.');
	}

	return user;
};
