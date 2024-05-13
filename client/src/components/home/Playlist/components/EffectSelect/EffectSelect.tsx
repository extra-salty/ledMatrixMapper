import { useDispatch } from 'react-redux';
import { useAnimationEffects } from '@/libs/redux/features/effects/data/selector';
import { playlistDataActions } from '@/libs/redux/features/playlist/data/slice';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AnimationTableRowT } from '@/types/animation/animationTable.types';

const EffectSelect = ({
	row: { animationId, id, effectId },
}: {
	row: AnimationTableRowT;
}) => {
	const dispatch = useDispatch();
	const effects = useAnimationEffects(animationId);

	const handleOnChange = ({ target: { value } }: SelectChangeEvent) => {
		const name = effects[value]?.name || 'None';

		dispatch(
			playlistDataActions.updateChild({ animationId, id, key: 'effectId', value }),
		);
		dispatch(
			playlistDataActions.updateChild({ animationId, id, key: 'name', value: name }),
		);
	};

	return (
		<FormControl fullWidth variant='standard'>
			<Select
				id='effect-select'
				disableUnderline
				value={effectId}
				// defaultValue={effectId}
				onChange={handleOnChange}
				sx={{ maxHeight: '28px' }}
			>
				<MenuItem value={undefined}>
					<em>None</em>
				</MenuItem>
				{Object.values(effects).map(({ id, name }) => (
					<MenuItem key={id} value={id}>
						{name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default EffectSelect;
