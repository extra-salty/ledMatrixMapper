import { useDispatch } from 'react-redux';
import { usePlaylistDataExist } from '@/libs/redux/features/playlist/data/selectors';
import { usePlaylistRowSelection } from '@/libs/redux/features/playlist/state/selectors';
import { memo, useState } from 'react';
import { AppDispatch } from '@/libs/redux/store';
import { saveAnimations } from '@/libs/redux/features/playlist/data/thunk';
import { ActionButtonProps } from '@/types/components/components.types';
import { Box } from '@mui/material';
import { Clear, PlaylistRemove, Save, SaveAs } from '@mui/icons-material';
import { AnimationsTableInstanceT } from '@/types/animation/animationTable.types';
import RemoveDialog from '../../dialogs/RemoveDialog/RemoveDialog';
import ResetDialog from '../../dialogs/ResetDialog/ResetDialog';
import GenericActions from '@/components/misc/GenericAction/GenericAction';
import useConvertedData from '../../usePlaylistProps/useConvertedData';

const PlaylistCustomActions = ({ table }: { table: AnimationsTableInstanceT }) => {
	const dispatch = useDispatch<AppDispatch>();
	const isSelectionEmpty = !Object.keys(usePlaylistRowSelection()).length;

	const isDataExist = usePlaylistDataExist();

	const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState<boolean>(false);
	const [isResetDialogOpen, setResetDialogOpen] = useState<boolean>(false);

	const data = useConvertedData();

	const actions: ActionButtonProps[] = [
		{
			text: 'Remove From Playlist',
			disabled: isSelectionEmpty,
			icon: <PlaylistRemove />,
			onClick: () => setIsRemoveDialogOpen(true),
		},
		{
			text: 'Clear Playlist',
			icon: <Clear />,
			onClick: () => setResetDialogOpen(true),
		},
		{
			text: 'Save As New',
			// disabled: isSelectionEmpty,
			disabled: !isDataExist,
			icon: <SaveAs />,
			onClick: () => {},
		},
		{
			text: 'Save Each',
			icon: <Save />,
			onClick: () => {
				console.log('🚀 ~ PlaylistCustomActions ~ data:', data);
				dispatch(saveAnimations());
			},
		},
	];

	return (
		<>
			<RemoveDialog open={isRemoveDialogOpen} setOpen={setIsRemoveDialogOpen} />
			<ResetDialog open={isResetDialogOpen} setOpen={setResetDialogOpen} />
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<GenericActions actions={actions} />
			</Box>
		</>
	);
};

export default memo(PlaylistCustomActions);
