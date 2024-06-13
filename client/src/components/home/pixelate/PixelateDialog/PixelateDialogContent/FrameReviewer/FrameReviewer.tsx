import FrameStatic from '@/components/temp/FrameComps/FrameStatic/FrameStatic';
import { ColorT } from '@/types/color/color.types';
import { FrameDataT } from '@/types/effect/effect.types';
import { RestartAlt } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import FrameReviewerSliders from './FrameReviewerSliders/FrameReviewerSliders';

const FrameReviewer = ({
	frameData,
	setFrameData,
}: {
	frameData: FrameDataT;
	setFrameData: Dispatch<SetStateAction<FrameDataT | null>>;
}) => {
	const [blurIntensity, setBlurIntensity] = useState<number>(0);
	const [showGrid, setShowGrid] = useState<boolean>(false);

	const convertedData: (ColorT | undefined)[][] = frameData.map((column) =>
		column.map((cell) => cell?.color),
	);

	const handleReset = () => setFrameData(null);

	return (
		<>
			<Box
				sx={(theme) => ({
					display: 'flex',
					flexDirection: 'column',
					// justifyContent: 'center',
					height: '500px',
					// width: '100%',
					position: 'relative',
					border: `1px solid ${theme.palette.divider}`,
				})}
			>
				<FrameStatic
					showGrid={showGrid}
					blurIntensity={blurIntensity}
					frameData={convertedData}
				/>
			</Box>
			<Box sx={{ display: 'flex', gap: 5 }}>
				<FrameReviewerSliders
					blurIntensity={blurIntensity}
					setBlurIntensity={setBlurIntensity}
				/>
				<Button variant='outlined' onClick={handleReset} startIcon={<RestartAlt />}>
					Reset
				</Button>
			</Box>
		</>
	);
};

export default FrameReviewer;
