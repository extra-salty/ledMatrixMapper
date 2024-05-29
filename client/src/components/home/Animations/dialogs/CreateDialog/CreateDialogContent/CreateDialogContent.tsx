import { ChangeEvent, useState } from 'react';
import { TableRows, ViewColumn } from '@mui/icons-material';
import { Box, DialogContent, InputAdornment, TextField } from '@mui/material';

const CreateDialogContent = ({ isInvalidName }: { isInvalidName: boolean }) => {
	const min = 1;
	const max = 100;

	const [columns, setColumns] = useState<number>(24);
	const [rows, setRows] = useState<number>(12);

	const handleNumberChange = (value: string): number => {
		const numericValue = Number(value.replace(/[^0-9]/g, ''));
		const limitedValue = limitValue(numericValue);

		return limitedValue;
	};

	const handleColumnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const formattedValue = handleNumberChange(target.value);

		setColumns(formattedValue);
	};

	const handleRowChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const formattedValue = handleNumberChange(target.value);

		setRows(formattedValue);
	};

	const limitValue = (value: number) => Math.max(min, Math.min(max, value));

	return (
		<DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			<TextField
				required
				fullWidth
				error={isInvalidName}
				helperText={isInvalidName ? 'Already exist. Choose a different name.' : ' '}
				id='name'
				name='name'
				label='Name'
				type='text'
				variant='outlined'
			/>
			<Box
				sx={{
					display: 'flex',
					gap: 7,
					alignItems: 'center',
				}}
			>
				<TextField
					fullWidth
					multiline
					rows={3}
					id='description'
					name='description'
					label='Description'
					type='text'
					variant='outlined'
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '22px',
						alignItems: 'center',
					}}
				>
					<TextField
						required
						type='number'
						id='width'
						name='width'
						label='Matrix width'
						variant='outlined'
						size='small'
						value={columns}
						onChange={handleColumnChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<ViewColumn />
								</InputAdornment>
							),
						}}
						sx={{ width: '120px' }}
					/>
					<TextField
						required
						type='number'
						id='height'
						name='height'
						label='Matrix height'
						variant='outlined'
						size='small'
						value={rows}
						onChange={handleRowChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<TableRows />
								</InputAdornment>
							),
						}}
						sx={{ width: '120px' }}
					/>
				</Box>
			</Box>
		</DialogContent>
	);
};

export default CreateDialogContent;
