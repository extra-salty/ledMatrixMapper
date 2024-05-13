import { useDispatch } from 'react-redux';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { AnimationChildrenBaseT } from '@/types/animation/animation.types';
import { EffectsTableRowT } from '@/types/effects/effectTable.types';
import { ChangeEvent, FocusEvent, useState } from 'react';
import { TextField } from '@mui/material';

const TextInput = ({
	row,
	propertyKey,
}: {
	row: EffectsTableRowT;
	propertyKey: keyof AnimationChildrenBaseT & ('name' | 'description');
}) => {
	const dispatch = useDispatch();
	const { effects, animationId, id } = row;

	console.log('🚀 ~ row[propertyKey]:', row[propertyKey]);
	const [value, setValue] = useState<string | undefined>(row[propertyKey]);

	const handleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
		setValue(value);

	const handleOnBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => {
		if (effects) {
			dispatch(
				playlistDataActions.updateAnimation({
					animationId,
					key: propertyKey,
					value,
				}),
			);
		} else {
			dispatch(
				effectsDataActions.updateEffect({
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
			key={row[propertyKey]}
			fullWidth
			variant='standard'
			size='small'
			value={value}
			onChange={handleOnChange}
			onBlur={handleOnBlur}
			InputProps={{
				disableUnderline: true,
				// onMouseEnter: () => setDisableUnderline(false),
				// onMouseLeave: () => setDisableUnderline(true),
			}}
		/>
	);
};

export default TextInput;
