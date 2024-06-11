import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import {
	AddPhotoAlternate,
	Download,
	FileUpload,
	ImageSearch,
} from '@mui/icons-material';
import { ActionButtonProps } from '@/types/components/components.types';
import { Box } from '@mui/material';
import PixelateDialog from '@/components/home/pixelate/PixelateDialog/PixelateDialog';
import GenericActions from '@/components/misc/GenericAction/GenericAction';

const FrameActions = ({ disabled }: { disabled: boolean }) => {
	const dispatch = useDispatch<AppDispatch>();

	const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

	const actions: ActionButtonProps[] = [
		{
			text: 'Pixelate Image',
			icon: <ImageSearch />,
			tooltip: 'Import Image',
			onClick: () => setIsImportDialogOpen(true),
		},
		{
			icon: <Download />,
			text: 'Download Raw Data',
			disabled: true,
			onClick: () => {},
		},
		{
			icon: <FileUpload />,
			text: 'Import Raw Data',
			disabled: true,
			onClick: () => {},
		},
		{
			icon: <AddPhotoAlternate />,
			text: 'Create Frame',
			onClick: () => dispatch(effectsDataActions.addFrame()),
		},
	];

	return (
		<>
			<PixelateDialog open={isImportDialogOpen} setOpen={setIsImportDialogOpen} />
			<Box
				sx={(theme) => ({
					display: 'flex',
					alignItems: 'center',
					border: `1px solid ${theme.palette.divider}`,
					borderRadius: '4px',
					height: 40,
				})}
			>
				<GenericActions actions={actions} disableAll={disabled} />
			</Box>
		</>
	);
};

export default memo(FrameActions);
