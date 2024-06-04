import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { TransitionT } from '@/types/effect/effect.types';
import {
	FormControl,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
	Tooltip,
} from '@mui/material';
import Image from 'next/image';
import { useActiveTransition } from '@/libs/redux/features/effects/data/selector';

const TransitionSelector = () => {
	const dispatch = useDispatch();
	const activeTransition = useActiveTransition();

	const transitions: { type: TransitionT; text: string }[] = [
		{
			type: TransitionT.linear,
			text: 'Linear',
		},
		{
			type: TransitionT.easeIn,
			text: 'Ease In',
		},
		{
			type: TransitionT.easeOut,
			text: 'Ease Out',
		},
		{
			type: TransitionT.easeInOut,
			text: 'Ease In Out',
		},
	];

	const handleChange = ({ target: { value } }: SelectChangeEvent) =>
		dispatch(effectsDataActions.setActiveTransition(value as TransitionT));

	return (
		<Tooltip title='Transition' placement='top-start' arrow>
			<FormControl>
				<Select
					variant='outlined'
					size='small'
					disableUnderline
					value={activeTransition}
					onChange={handleChange}
					SelectDisplayProps={{
						style: {
							display: 'flex',
							alignItems: 'center',
							// paddingBottom: '0',
						},
					}}
					MenuProps={{
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'left',
						},
						transformOrigin: {
							vertical: 'top',
							horizontal: 'left',
						},
					}}
				>
					{Object.values(transitions).map(({ type, text }) => (
						<MenuItem key={type} value={type}>
							<ListItemIcon sx={{ minWidth: '0', marginInline: 1 }}>
								<Image src={`/${type}.svg`} alt={type} width={20} height={20} />
							</ListItemIcon>
							<ListItemText sx={{ my: 0 }}>{text}</ListItemText>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Tooltip>
	);
};

export default memo(TransitionSelector);
