import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { playlistStateActions } from '@/libs/redux/features/playlist/state/slice';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { ActionButtonProps } from '@/types/components/components.types';
import {
	AddPhotoAlternate,
	Clear,
	ContentCopy,
	CreateNewFolder,
	Edit,
	PlaylistRemove,
} from '@mui/icons-material';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';
import { appActions } from '@/libs/redux/features/app/slice';
import { MainTabs } from '@/libs/redux/features/app/appSlice.types';

const RowActionMenuItems = ({
	rowId,
	originalRow,
}: {
	rowId: string;
	originalRow: AnimationTableRowT;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const items: ActionButtonProps[] = [
		{
			text: 'Edit',
			icon: <Edit />,
			hidden: originalRow.type !== AnimationChildrenTypesT.effect,
			onClick: () => {
				dispatch(
					effectsDataActions.setActiveEffect({
						effectId: originalRow.effectId || '',
						animationId: originalRow.animationId,
					}),
				);
				dispatch(appActions.setMainTab(MainTabs.effectCreator));
			},
		},
		{
			text: 'Remove',
			icon: <Clear />,
			onClick: () => {
				if (originalRow.type === AnimationChildrenTypesT.animation) {
					dispatch(playlistStateActions.removeAnimation(originalRow.animationId));
					dispatch(playlistDataActions.removeAnimation(originalRow.animationId));
					dispatch(effectsDataActions.removeAnimation(originalRow.animationId));
				} else {
					dispatch(playlistDataActions.remove(originalRow));
				}
			},
		},
		{
			text: 'Remove Children',
			icon: <PlaylistRemove />,
			disabled: !originalRow.children?.length,
			hidden: originalRow.type === AnimationChildrenTypesT.effect,
			onClick: () => dispatch(playlistDataActions.removeChildren(originalRow)),
		},
		{
			text: 'Add group',
			icon: <CreateNewFolder />,
			hidden: originalRow.type === AnimationChildrenTypesT.effect,
			onClick: () => {
				dispatch(playlistDataActions.addChild({ originalRow, childType: 'group' }));
				// dispatch(playlistStateActions.addToExpanded(rowId));
			},
		},
		{
			text: 'Add Effect',
			icon: <AddPhotoAlternate />,
			hidden: originalRow.type === AnimationChildrenTypesT.effect,
			onClick: () => {
				dispatch(playlistDataActions.addChild({ originalRow, childType: 'effect' }));
				// dispatch(playlistStateActions.addToExpanded(rowId));
			},
		},
		{
			text: 'Duplicate',
			icon: <ContentCopy />,
			hidden: originalRow.type === AnimationChildrenTypesT.animation,
			onClick: () => {},
		},
	];

	return <GenericMenuItems items={items} />;
};

export default RowActionMenuItems;
