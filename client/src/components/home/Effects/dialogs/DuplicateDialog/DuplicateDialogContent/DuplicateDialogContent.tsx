import { EffectsTableRowT } from '@/types/effect/effectTable.types';
import { Box, TextField } from '@mui/material';

const DuplicateDialogContent = ({
	row,
	isInvalidName,
}: {
	row: EffectsTableRowT;
	isInvalidName: boolean;
}) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			<TextField
				required
				fullWidth
				defaultValue={row.name}
				error={isInvalidName}
				helperText={isInvalidName ? 'Already exist. Choose a different name.' : ' '}
				id='name'
				name='name'
				label='Name'
				type='text'
				variant='outlined'
			/>
			<TextField
				fullWidth
				multiline
				rows={5}
				defaultValue={row.description || ' '}
				id='description'
				name='description'
				label='Description'
				type='text'
				variant='outlined'
			/>
		</Box>
	);
};

export default DuplicateDialogContent;
