import { Routes } from '@/misc/hooks/useRoutes/useRoutes';
import { usePathname } from 'next/navigation';
import { Box, Link, Tooltip } from '@mui/material';
import { ArrowLeft, GitHub } from '@mui/icons-material';
import { Button } from '@mui/material';

const UserLayoutFooter = () => {
	const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK;
	const isLoginPage = usePathname().split('/').pop() === 'login';

	return (
		<Box
			component='footer'
			sx={{
				height: '50px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			{isLoginPage ? (
				<Tooltip title='Github Repository'>
					<Link
						variant='button'
						underline='hover'
						rel='noreferrer'
						target='_blank'
						href={githubLink}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<GitHub fontSize='small' />
						Find out more
					</Link>
				</Tooltip>
			) : (
				<Button href={Routes.Login} startIcon={<ArrowLeft />}>
					Log In
				</Button>
			)}
		</Box>
	);
};

export default UserLayoutFooter;
