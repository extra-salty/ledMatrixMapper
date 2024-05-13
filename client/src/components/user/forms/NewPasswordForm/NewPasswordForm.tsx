import useSWRMutation from 'swr/mutation';
import useApp from '@/providers/AppProvider/useApp';
import { FormEvent, useState } from 'react';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm/realm.types';
import { MongoDBRealmError } from 'realm-web';
import { Alert, AlertTitle, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Password from '../../../account/Password/Password';
import Form from '../Form/Form';

export const NewPasswordForm = ({
	token,
	tokenId,
}: {
	token: string;
	tokenId: string;
}) => {
	const { app } = useApp();

	const [passwordError, setPasswordError] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement> | any) => {
		event.preventDefault();
		reset();
		setPasswordError('');

		const formData = new FormData(event.target);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;

		if (firstPassword !== secondPassword) {
			setPasswordError('Passwords do not match.');
		} else {
			trigger(secondPassword);
		}
	};

	const handleNewPassword = async (_: string, { arg }: { arg: string }) => {
		await app.emailPasswordAuth.resetPassword({
			password: arg,
			token,
			tokenId,
		});
		return true;
	};

	const {
		data: isFinished,
		isMutating,
		error,
		trigger,
		reset,
	} = useSWRMutation('/user/newPassword', handleNewPassword, {
		throwOnError: false,
	});

	const handleError = (e: MongoDBRealmError) => {
		switch (e?.errorCode) {
			case RealmErrorCodes.BadRequest:
				return RealmErrorMessages.InvalidToken;
			case RealmErrorCodes.UserpassTokenInvalid:
				return RealmErrorMessages.ExpiredToken;
			default:
				return RealmErrorMessages.WentWrong;
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Password id='firstPassword' label='New password' enableStrength />
			<Password
				id='secondPassword'
				label='Reenter new password'
				initialError={passwordError}
				enableStrength
			/>
			<LoadingButton
				type='submit'
				variant='outlined'
				size='large'
				fullWidth={false}
				loading={isMutating}
				sx={{ marginRight: 'auto' }}
			>
				Reset Password
			</LoadingButton>
			<Fade in={isFinished}>
				{error ? (
					<Alert variant='outlined' severity='error'>
						<AlertTitle>Password reset failed</AlertTitle>
						{handleError(error)}
					</Alert>
				) : (
					<Alert variant='outlined'>
						<AlertTitle>Password successfully updated.</AlertTitle>
						Go back to the log in page to access your account.
					</Alert>
				)}
			</Fade>
		</Form>
	);
};
