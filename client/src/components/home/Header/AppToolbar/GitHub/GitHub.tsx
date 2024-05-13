import { Tooltip, IconButton } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const GitHub = () => {
	const githubLink = process.env.NEXT_PUBLIC_GITHUB_LINK;

	return (
		<Tooltip title='Github Repository'>
			<IconButton target='_blank' rel='noreferrer' href={githubLink}>
				<GitHubIcon />
			</IconButton>
		</Tooltip>
	);
};

export default GitHub;
