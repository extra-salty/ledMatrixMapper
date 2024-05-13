import { useRouter } from 'next/navigation';

export enum Routes {
	Home = '/home',
	Login = '/user/login',
	Register = '/user/register',
	Reset = '/user/reset',
	Confirm = '/user/confirm',
}
type ParamT = Record<string, any>;

export const useRoutes = (route: Routes, params?: ParamT) => {
	const router = useRouter();

	const urlParams = new URLSearchParams(params);

	const path = `${route}?${urlParams}`;

	return () => router.push(path);
};
