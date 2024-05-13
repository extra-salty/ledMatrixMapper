import { useDispatch } from 'react-redux';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import {
	AnimationChildrenBaseT,
	AnimationChildrenTypesT,
} from '@/types/animation/animation.types';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { FocusEvent } from 'react';
import { TextField } from '@mui/material';

const PlaylistTextInput = ({
	row,
	propertyKey,
}: {
	row: AnimationTableRowT;
	propertyKey: keyof AnimationChildrenBaseT & ('name' | 'description');
}) => {
	const dispatch = useDispatch();
	const { type, animationId, id } = row;

	const handleOnBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
		if (type === AnimationChildrenTypesT.animation) {
			dispatch(
				playlistDataActions.updateAnimation({
					animationId,
					key: propertyKey,
					value,
				}),
			);
		} else {
			dispatch(
				playlistDataActions.updateChild({
					animationId,
					id,
					key: propertyKey,
					value,
				}),
			);
		}
	};

	return (
		<TextField
			variant='standard'
			size='small'
			defaultValue={row[propertyKey]}
			onBlur={handleOnBlur}
			InputProps={{ disableUnderline: true }}
			sx={{ maxHeight: '28px' }}
		/>
	);
};

export default PlaylistTextInput;
