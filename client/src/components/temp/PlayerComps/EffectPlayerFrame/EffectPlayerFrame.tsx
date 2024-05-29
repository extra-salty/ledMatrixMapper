import { memo } from 'react';
import { useEffectPlayerOptions } from '@/libs/redux/features/effectEditor/selectors';
import { ColorT } from '@/types/color/color.types';
import { Box, Skeleton } from '@mui/material';
import FrameStatic from '../../FrameComps/FrameStatic/FrameStatic';

const EffectPlayerFrame = ({ data }: { data: ColorT[][] }) => {
	const { borderEnabled, blur } = useEffectPlayerOptions();

	return (
		<Box
			sx={(theme) => ({
				border: '1px solid',
				borderColor: theme.palette.divider,
				borderRadius: '4px 4px 0px 0px ',
			})}
		>
			{data ? (
				<FrameStatic
					frameData={data}
					frameId='effectPlayerFrame'
					showCoordinate={true}
					showBorder={borderEnabled}
					blur={blur}
				/>
			) : (
				<Skeleton
					sx={{
						width: '100%',
						height: 'auto',
						aspectRatio: '1.80',
					}}
				/>
			)}
		</Box>
	);
};

export default memo(EffectPlayerFrame);
