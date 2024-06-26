import { memo } from 'react';
import { useAnimationNames } from '@/libs/redux/features/playlist/data/selectors';
import { useDispatch } from 'react-redux';
import {
	useActiveEffectIds,
	useEffectCollections,
} from '@/libs/redux/features/effects/data/selector';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import {
	Box,
	FormControl,
	InputLabel,
	ListSubheader,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';

const EffectDetails = ({
	name,
	description,
}: {
	name?: string;
	description?: string;
}) => {
	const dispatch = useDispatch();

	const animations = useEffectCollections();
	const animationNames = useAnimationNames();
	const activeEffect = useActiveEffectIds();

	const value = activeEffect
		? `${activeEffect.animationId}/${activeEffect.effectId}`
		: '';

	const handleEffectChange = (event: SelectChangeEvent) => {
		const [animationId, effectId] = event.target.value.split('/');

		dispatch(effectsDataActions.setActiveEffect({ animationId, effectId }));
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
			<FormControl fullWidth size='small'>
				<InputLabel variant='standard' id='effect-select-label'>
					Selected Effect
				</InputLabel>
				<Select
					id='effect-select'
					variant='standard'
					label='Selected Effect'
					labelId='effect-select-label'
					value={value}
					onChange={handleEffectChange}
				>
					{Object.entries(animations).map(([animationId, effects]) => [
						<ListSubheader key={animationId}>
							{animationNames[animationId]}
						</ListSubheader>,
						[
							Object.entries(effects).map(([effectId, { name }]) => (
								<MenuItem key={effectId} value={`${animationId}/${effectId}`}>
									{name}
								</MenuItem>
							)),
						],
					])}
				</Select>
			</FormControl>
			<TextField
				size='small'
				margin='none'
				variant='standard'
				label='Name'
				defaultValue={name}
				disabled={!activeEffect}
				onBlur={(e) => {
					dispatch(
						effectsDataActions.updateEffect({
							animationId: activeEffect!.animationId,
							id: activeEffect!.effectId,
							key: 'name',
							value: e.target.value,
						}),
					);
				}}
			/>
			<TextField
				size='small'
				margin='none'
				variant='standard'
				label='Description'
				defaultValue={description}
				disabled={!activeEffect}
				onBlur={(e) => {
					dispatch(
						effectsDataActions.updateEffect({
							animationId: activeEffect!.animationId,
							id: activeEffect!.effectId,
							key: 'description',
							value: e.target.value,
						}),
					);
				}}
			/>
		</Box>
	);
};

export default memo(EffectDetails);
