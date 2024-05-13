import useSWRMutation from 'swr/mutation';
import { useUser } from '@/providers/UserProvider/useUser';
import { ClipboardEvent, ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';

const AccountDeletionDialog = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const user = useUser();
	const logout = () => {}; // from UserProvider

	const email = user?.profile.email;

	const [textInput, setTextInput] = useState<string>('');

	const handleClose = () => setOpen(false);

	const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const value = target.value.trim();
		setTextInput(value);
	};

	const handlePreventDefault = (event: ClipboardEvent<HTMLInputElement>) =>
		event.preventDefault();

	const handleDelete = async () => {
		await user.app.deleteUser(user);
		logout();
	};

	const { isMutating, trigger } = useSWRMutation('user/delete', handleDelete);

	return (
		<Dialog
			open={open}
			PaperProps={{
				sx: { width: '500px' },
			}}
			sx={{ zIndex: '2500' }}
			onClose={handleClose}
		>
			<DialogTitle>Delete User Account</DialogTitle>
			<DialogContent dividers>
				<DialogContentText
					sx={{ display: 'flex', flexDirection: 'column', marginBottom: '25px' }}
				>
					<span>
						All data associated with the user account will be lost. Enter user email to
						confirm deletion: <strong>{email}</strong>
					</span>
				</DialogContentText>
				<TextField
					value={textInput}
					fullWidth
					id='email'
					label='Email Address'
					onChange={handleOnChange}
					onCopy={handlePreventDefault}
					onPaste={handlePreventDefault}
				/>
			</DialogContent>
			<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button variant='outlined' onClick={handleClose}>
					Cancel
				</Button>
				<LoadingButton
					variant='outlined'
					color='warning'
					loading={isMutating}
					disabled={textInput !== email}
					onClick={() => trigger()}
				>
					DELETE
				</LoadingButton>
			</DialogActions>
		</Dialog>
	);
};

export default AccountDeletionDialog;
