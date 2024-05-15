import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const GenericDialog = ({
	open,
	title,
	children,
	onClose,
	onSubmit,
}: {
	open: boolean;
	title: string;
	children: React.ReactNode;
	onClose: () => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				component: 'form',
				sx: { width: '500px' },
				onSubmit: onSubmit,
			}}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' onClick={onClose}>
					Cancel
				</Button>
				<Button type='submit' variant='outlined'>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenericDialog;
