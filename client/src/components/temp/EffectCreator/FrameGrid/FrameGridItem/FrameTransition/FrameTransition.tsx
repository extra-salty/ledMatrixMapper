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

const FrameTransition = ({
	frameId,
	transition,
}: {
	frameId: string;
	transition: TransitionT;
}) => {
	const dispatch = useDispatch();

	const transitions: { type: TransitionT['timing']; text: string }[] = [
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

	const handleChange = ({ target: { value } }: SelectChangeEvent) => {};
	// dispatch(
	// 	effectsDataActions.updateFrame({
	// 		frameId,
	// 		key: 'transition',
	// 		value: value as TransitionT,
	// 	}),
	// );

	return (
		<Tooltip title='Transition' placement='top-start' arrow>
			<FormControl>
				<Select
					native={false}
					variant='standard'
					size='small'
					disableUnderline
					// value={transition}
					onChange={handleChange}
					renderValue={(value) => <div>{value}</div>}
					// SelectDisplayProps={{
					// 	style: {
					// 		display: 'flex',
					// 		alignItems: 'center',
					// 		width: '25px',
					// 		paddingBottom: '0',
					// 	},
					// }}
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
					sx={{ minWidth: '100px' }}
				>
					{Object.values(transitions).map(({ type, text }) => (
						<MenuItem key={type} value={type}>
							<ListItemIcon sx={{ marginLeft: 1 }}>
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

export default memo(FrameTransition);
