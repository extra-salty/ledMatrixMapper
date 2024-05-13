import { useEffect } from 'react';
import Script, { ScriptProps } from 'next/script';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';

export const ScriptWithCleanup = (props: ScriptProps) => {
	const router = useRouter();

	useEffect(() => {
		const onRouterChange = (newPath: string) => {
			window.location.href = router.basePath + newPath;
		};
		router.events.on('routeChangeStart', onRouterChange);

		return () => {
			router.events.off('routeChangeStart', onRouterChange);
		};
	}, [router, props]);

	return <Script {...props} />;
};
