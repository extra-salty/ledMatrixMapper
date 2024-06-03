import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { FrameTransitionT } from '@/types/effects/effect.types';
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
	transition: FrameTransitionT;
}) => {
	const dispatch = useDispatch();

	const transitions: { type: FrameTransitionT; text: string }[] = [
		{
			type: FrameTransitionT.linear,
			text: 'Linear',
		},
		{
			type: FrameTransitionT.easeIn,
			text: 'Ease In',
		},
		{
			type: FrameTransitionT.easeOut,
			text: 'Ease Out',
		},
		{
			type: FrameTransitionT.easeInOut,
			text: 'Ease In Out',
		},
	];

	const handleChange = ({ target: { value } }: SelectChangeEvent) =>
		dispatch(
			effectsDataActions.updateFrame({
				frameId,
				key: 'transition',
				value: value as FrameTransitionT,
			}),
		);

	return (
		<Tooltip title='Transition'>
			<FormControl>
				<Select
					variant='standard'
					size='small'
					disableUnderline
					value={transition}
					onChange={handleChange}
					SelectDisplayProps={{
						style: {
							display: 'flex',
							alignItems: 'center',
							width: '25px',
							paddingBottom: '0',
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
