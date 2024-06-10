import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { TransitionT } from '@/types/effect/effect.types';
import {
	FormControl,
	ListItemIcon,
	ListItemText,
	ListSubheader,
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
	const transitonString = `${activeTransition.direction}/${activeTransition.function}`;

	const directions: { type: TransitionT['direction']; text: string }[] = [
		{
			type: 'appear',
			text: 'Appear',
		},
		{
			type: 'disappear',
			text: 'Disappear',
		},
	];

	const functions: { type: TransitionT['function']; text: string }[] = [
		{
			type: 'linear',
			text: 'Linear',
		},
		{
			type: 'easeIn',
			text: 'Ease In',
		},
		{
			type: 'easeOut',
			text: 'Ease Out',
		},
		{
			type: 'easeInOut',
			text: 'Ease In Out',
		},
	];

	const handleChange = ({ target: { value } }: SelectChangeEvent) => {
		const transition = value.split('/') as [
			TransitionT['direction'],
			TransitionT['function'],
		];

		dispatch(
			effectsDataActions.setActiveTransition({
				direction: transition[0],
				function: transition[1],
			}),
		);
	};

	return (
		<Tooltip title='Transition' placement='top-start' arrow>
			<FormControl>
				<Select
					variant='standard'
					size='small'
					disableUnderline
					value={transitonString}
					onChange={handleChange}
					SelectDisplayProps={{
						style: {
							display: 'flex',
							alignItems: 'center',
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
					sx={(theme) => ({
						width: 150,
						border: `1px solid ${theme.palette.divider}`,
						borderRadius: 1,
						height: 40,
					})}
				>
					<MenuItem value={undefined}>
						<ListItemIcon sx={{ minWidth: 0, marginInline: 2 }}>
							{/* <Image
								src={`/${type}.svg`}
								alt={type}
								width={20}
								height={20}
								style={{
									// transform: direction.type === 'disappear' ? 'scaleX(-1)' : 'none',
								}}
							/> */}
						</ListItemIcon>
						<ListItemText sx={{ my: 0 }}>{'None'}</ListItemText>
					</MenuItem>
					{directions.map((direction) => [
						<ListSubheader key={direction.type}>{direction.text}</ListSubheader>,
						[
							functions.map(({ type, text }) => (
								<MenuItem key={type} value={`${direction.type}/${type}`}>
									<ListItemIcon sx={{ minWidth: 0, marginInline: 2 }}>
										<Image
											src={`/${type}.svg`}
											alt={type}
											width={20}
											height={20}
											style={{
												transform: direction.type === 'disappear' ? 'scaleX(-1)' : 'none',
											}}
										/>
									</ListItemIcon>
									<ListItemText sx={{ my: 0 }}>{text}</ListItemText>
								</MenuItem>
							)),
						],
					])}
				</Select>
			</FormControl>
		</Tooltip>
	);
};

export default memo(TransitionSelector);
