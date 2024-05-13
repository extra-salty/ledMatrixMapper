import { AnimationTableRowT } from '@/types/animation/animationTable.types';
import { DialogContent, TextField } from '@mui/material';

const DuplicateDialogContent = ({
	row,
	isInvalidName,
}: {
	row: AnimationTableRowT;
	isInvalidName: boolean;
}) => {
	return (
		<DialogContent
			dividers
			sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
		>
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
		</DialogContent>
	);
};

export default DuplicateDialogContent;
