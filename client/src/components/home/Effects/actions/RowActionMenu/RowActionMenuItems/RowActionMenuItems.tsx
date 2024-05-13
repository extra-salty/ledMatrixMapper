import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/libs/redux/store';
import { Dispatch, SetStateAction } from 'react';
import { ActionButtonProps } from '@/types/components/components.types';
import { Add, ContentCopy, Delete, Edit } from '@mui/icons-material';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import GenericMenuItems from '@/components/misc/GenericMenuItems/GenericMenuItems';
import { appActions } from '@/libs/redux/features/app/slice';
import { MainTabs } from '@/libs/redux/features/app/appSlice.types';

const RowActionMenuItems = ({
	row,
	setIsCreateDialogOpen,
	setIsDeleteDialogOpen,
}: {
	row: EffectsTableRowT;
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const items: ActionButtonProps[] = [
		{
			text: 'Edit',
			icon: <Edit />,
			hidden: !!row.effects,
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
			hidden: !!row.effects,
			onClick: () => dispatch(effectsDataActions.deleteEffect(row)),
		},
		{
			text: 'Create Effect',
			icon: <Add />,
			hidden: !row.effects,
			onClick: () => {
				// dispatch(effectsDataActions.addEffect(row));
			},
		},
		{
			text: 'Duplicate',
			icon: <ContentCopy />,
			hidden: !!row.effects,
			onClick: () => setIsCreateDialogOpen(true),
		},
	];

	return <GenericMenuItems items={items} />;
};

export default RowActionMenuItems;
