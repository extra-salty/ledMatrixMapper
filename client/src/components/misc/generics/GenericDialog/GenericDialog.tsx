import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FormEvent } from 'react';

const GenericDialog = ({
	open,
	title,
	children,
	submitText,
	isSubmitDisabled,
	onClose,
	onSubmit,
}: {
	open: boolean;
	title: string;
	children: React.ReactNode;
	submitText: string;
	isSubmitDisabled?: boolean;
	onClose: () => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				component: 'form',
				sx: { minWidth: '500px', maxWidth: 'none' },
				onSubmit: (event: FormEvent<HTMLFormElement>) => {
					event.preventDefault();
					onSubmit(event);
				},
			}}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' onClick={onClose}>
					Cancel
				</Button>
				<Button type='submit' variant='outlined' disabled={isSubmitDisabled}>
					{submitText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenericDialog;
