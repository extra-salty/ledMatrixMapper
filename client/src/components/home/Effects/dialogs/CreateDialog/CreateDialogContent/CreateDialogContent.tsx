import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { useAnimationNames } from '@/libs/redux/features/playlist/data/selectors';
import { ChangeEvent, useState } from 'react';
import {
	Box,
	DialogContent,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

const CreateDialogContent = ({
	isInvalidName,
	initialAnimation,
}: {
	isInvalidName: boolean;
	initialAnimation: string;
}) => {
	const [frames, setFrames] = useState<number>(1);

	const animationsEffects = useEffectCollections();
	const animationNames = useAnimationNames();

	const handleFramesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const value = target.value;
		const numericValue = Number(value.replace(/[^0-9]/g, ''));
		const limitedValue = Math.max(1, Math.min(99, numericValue));

		setFrames(limitedValue);
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<FormControl required fullWidth>
				<InputLabel id='animation-label'>Animation</InputLabel>
				<Select
					id='animationId'
					name='animationId'
					label='Animation'
					labelId='animation-label'
					defaultValue={initialAnimation}
				>
					{Object.keys(animationsEffects).map((key) => (
						<MenuItem key={key} value={key}>
							{animationNames[key]}
						</MenuItem>
					))}
				</Select>
				<FormHelperText> </FormHelperText>
			</FormControl>
			<Box sx={{ display: 'flex', gap: 3 }}>
				<TextField
					required
					fullWidth
					error={isInvalidName}
					helperText={isInvalidName ? 'Already exist. Choose a different name.' : ' '}
					id='name'
					name='name'
					label='Effect Name'
					type='text'
					variant='outlined'
				/>
				<TextField
					type='number'
					id='frames'
					name='frames'
					label='Frames'
					variant='outlined'
					value={frames}
					onChange={handleFramesChange}
					sx={{ width: '100px' }}
				/>
			</Box>
			<TextField
				fullWidth
				id='description'
				name='description'
				label='Description'
				type='text'
				variant='outlined'
			/>
		</Box>
	);
};

export default CreateDialogContent;
