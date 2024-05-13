import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, SetStateAction } from 'react';
import { getAnimation } from '@/libs/redux/features/playlist/data/thunk';
import { ActionButtonProps } from '@/types/components/components.types';
import { ContentCopy, Delete, PlaylistAdd } from '@mui/icons-material';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';

const RowActionMenuItems = ({
	row,
	setIsCreateDialogOpen,
	setIsDeleteDialogOpen,
}: {
	row: AnimationTableRowT;
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const items: ActionButtonProps[] = [
		{
			text: 'Select',
			icon: <PlaylistAdd />,
			hidden: row.type !== AnimationChildrenTypesT.animation,
			onClick: () => dispatch(getAnimation(row.id)),
		},
		{
			text: 'Duplicate',
			icon: <ContentCopy />,
			onClick: () => setIsCreateDialogOpen(true),
		},
		{
			text: 'Delete',
			icon: <Delete />,
			onClick: () => setIsDeleteDialogOpen(true),
		},
	];

	return <GenericMenuItems items={items} />;
};

export default RowActionMenuItems;
