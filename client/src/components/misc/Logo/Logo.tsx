import { useApp_temp } from '@/providers/useApp_temp/useApp_temp';
import { Routes } from '@/misc/hooks/useRoutes/useRoutes';
import Image from 'next/image';

const Logo = () => {
	const app = useApp_temp();
	const user = app.currentUser;

	return (
		<a href={user ? Routes.Home : Routes.Login}>
			<Image priority src={'/vibe.svg'} alt='vibe-logo' width={150} height={60} />
		</a>
	);
};

export default Logo;
