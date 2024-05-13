import { useEffectCollections } from '@/libs/redux/features/effects/data/selector';
import { getAnimationName } from '@/libs/redux/features/playlist/data/selectors';
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

const CreateDialogContent = ({ isInvalidName }: { isInvalidName: boolean }) => {
	const [frames, setFrames] = useState<number>(1);

	const animations = useEffectCollections();

	const handleFramesChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const value = target.value;
		const numericValue = Number(value.replace(/[^0-9]/g, ''));
		const limitedValue = Math.max(1, Math.min(50, numericValue));

		setFrames(limitedValue);
	};

	return (
		<DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<FormControl required fullWidth>
				<InputLabel id='animation-label'>Animation</InputLabel>
				<Select
					id='animationId'
					name='animationId'
					label='Animation'
					labelId='animation-label'
				>
					{Object.keys(animations).map((key) => {
						const name = getAnimationName(key);

						return (
							<MenuItem key={key} value={key}>
								{name}
							</MenuItem>
						);
					})}
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
					label='Number of frames'
					variant='outlined'
					helperText='Between 1 and 50'
					value={frames}
					onChange={handleFramesChange}
					sx={{ width: '200px' }}
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
		</DialogContent>
	);
};

export default CreateDialogContent;

// InputProps={{
// 	startAdornment: (
// 		<InputAdornment position='start'>
// 			<ViewColumn />
// 		</InputAdornment>
// 	),
// }}
