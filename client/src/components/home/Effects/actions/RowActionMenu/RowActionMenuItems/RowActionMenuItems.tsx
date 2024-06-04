import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, SetStateAction } from 'react';
import { ActionButtonProps } from '@/types/components/components.types';
import { Add, ContentCopy, Delete, Edit } from '@mui/icons-material';
import { EffectsTableRowT } from '@/types/effect/effectTable.types';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { appActions } from '@/libs/redux/features/app/slice';
import { MainTabs } from '@/libs/redux/features/app/appSlice.types';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';

const RowActionMenuItems = ({
	row,
	setIsCreateDialogOpen,
	setIsDuplicateDialogOpen,
}: {
	row: EffectsTableRowT;
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsDuplicateDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const isAnimation = !!row.effects;

	const items: ActionButtonProps[] = [
		{
			text: 'Create Effect',
			icon: <Add />,
			hidden: !isAnimation,
			onClick: () => setIsCreateDialogOpen(true),
		},
		{
			text: 'Edit',
			icon: <Edit />,
			hidden: isAnimation,
			onClick: () => {
				dispatch(
					effectsDataActions.setActiveEffect({
						animationId: row.animationId,
						effectId: row.id,
					}),
				);
				dispatch(appActions.setMainTab(MainTabs.effectCreator));
			},
		},
		{
			text: 'Delete',
			icon: <Delete />,
			hidden: isAnimation,
			onClick: () => dispatch(effectsDataActions.deleteEffect(row)),
		},
		{
			text: 'Duplicate',
			icon: <ContentCopy />,
			hidden: isAnimation,
			onClick: () => setIsDuplicateDialogOpen(true),
		},
	];

	return <GenericMenuItems items={items} />;
};

export default RowActionMenuItems;
