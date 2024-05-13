import { useContext } from 'react';
import { Routes, useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import { DatabaseContext } from './DatabaseProvider';

export const useDatabase = () => {
	const data = useContext(DatabaseContext);

	const goToLogin = useRoutes(Routes.Login);

	if (!data) {
		goToLogin();
		throw new Error('Unable to access the database');
	}

	return data;
};
