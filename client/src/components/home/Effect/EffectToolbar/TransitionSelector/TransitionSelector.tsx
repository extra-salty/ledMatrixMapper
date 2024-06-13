import {
	useActiveColorAction,
	useActiveTransition,
} from '@/libs/redux/features/effects/data/selector';
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

const TransitionSelector = () => {
	const dispatch = useDispatch();

	const isTransitionActive =
		useActiveColorAction() === 'setTransition' || 'setColorAndTransition';
	const activeTransition = useActiveTransition();
	const transitonString = `${activeTransition.direction}/${activeTransition.timing}`;

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

	const functions: { type: TransitionT['timing']; text: string }[] = [
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
			TransitionT['timing'],
		];

		dispatch(
			effectsDataActions.setActiveTransition({
				direction: transition[0],
				timing: transition[1],
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
					SelectDisplayProps={{
						style: {
							display: 'flex',
							alignItems: 'center',
							paddingBottom: '0px',
						},
					}}
					sx={(theme) => ({
						height: 40,
						borderRadius: 1,
						border: `1px solid ${theme.palette.divider}`,
						paddingLeft: 2,
						backgroundColor: isTransitionActive ? 'rgba(255, 255, 255, 0.16)' : 'inherit',
					})}
					renderValue={(value) => {
						const transition = value.split('/') as [
							TransitionT['direction'],
							TransitionT['timing'],
						];
						const direction = transition[0];
						const timing = transition[1];

						return (
							<Image
								src={`/${timing}.svg`}
								alt={timing}
								width={20}
								height={20}
								style={{
									transform: direction === 'disappear' ? 'scaleX(-1)' : 'none',
								}}
							/>
						);
					}}
				>
					{directions.map((direction) => [
						<ListSubheader key={direction.type} sx={{ lineHeight: '36px' }}>
							{direction.text}
						</ListSubheader>,
						[
							functions.map(({ type, text }) => (
								<MenuItem
									key={type}
									value={`${direction.type}/${type}`}
									sx={{ padding: 1 }}
								>
									<ListItemIcon sx={{ minWidth: '20px !important', marginInline: 2 }}>
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
									<ListItemText>{text}</ListItemText>
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

{
	/* <MenuItem value={undefined}>
	<ListItemIcon sx={{ minWidth: 0, marginInline: 2 }}>
		<Image
			src={`/${type}.svg`}
			alt={type}
			width={20}
			height={20}
			style={
				{
					// transform: direction.type === 'disappear' ? 'scaleX(-1)' : 'none',
				}
			}
		/>
	</ListItemIcon>
	<ListItemText sx={{ my: 0 }}>{'None'}</ListItemText>
</MenuItem>; */
}
