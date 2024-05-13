import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { AppDispatch } from '@/libs/redux/store';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { CheckBoxOutlineBlank, DisabledByDefault } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

const DisableToggle = ({
	row: { type, animationId, id, disabled },
}: {
	row: AnimationTableRowT;
}) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const value = target.checked;

		if (type === AnimationChildrenTypesT.animation) {
			dispatch(
				playlistDataActions.updateAnimation({
					animationId,
					key: 'disabled',
					value,
				}),
			);
		} else {
			dispatch(
				playlistDataActions.updateChild({
					animationId,
					id,
					key: 'disabled',
					value,
				}),
			);
		}
	};

	return (
		<Checkbox
			size='small'
			color='default'
			checked={disabled}
			icon={<CheckBoxOutlineBlank />}
			checkedIcon={<DisabledByDefault />}
			sx={{ padding: '0px' }}
			onChange={handleOnChange}
		/>
	);
};

export default DisableToggle;
