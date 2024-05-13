import { AnimationStateT } from '@/types/animation/animation.types';
import { Box, Pagination, Stack } from '@mui/material';

const AnimationPaginations = ({
	playListData,
	activeAnimationIndex,
}: {
	playListData: AnimationStateT[];
	activeAnimationIndex: number;
}) => {
	return (
		<Stack spacing={2} direction='row' alignItems={'center'}>
			<Box>{playListData[activeAnimationIndex].name}</Box>
		</Stack>
	);
};

export default AnimationPaginations;
