import useApp from '@/providers/AppProvider/useApp';
import useSWRMutation from 'swr/mutation';
import { FormEvent } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Fade } from '@mui/material';
import { MongoDBRealmError } from 'realm-web';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm/realm.types';
import EmailAddress from '@/components/account/EmailAddress/EmailAddress';
import Form from '../Form/Form';

const PasswordResetForm = () => {
	const { app } = useApp();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		reset();

		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		trigger(email);
	};

	const handleReset = async (_: string, { arg }: { arg: string }) => {
		await app.emailPasswordAuth.sendResetPasswordEmail({ email: arg });
		return true;
	};

	const {
		data: isFinished,
		isMutating,
		error,
		trigger,
		reset,
	} = useSWRMutation('/password/reset', handleReset, {
		throwOnError: false,
	});

	const handleError = (e: MongoDBRealmError) => {
		switch (e?.errorCode) {
			case RealmErrorCodes.UserNotFound:
				return RealmErrorMessages.NotFound;
			default:
				return '';
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<EmailAddress initialError={handleError(error)} />
			<LoadingButton
				type='submit'
				variant='outlined'
				size='large'
				loading={isMutating}
				sx={{ marginRight: 'auto' }}
			>
				Reset Password
			</LoadingButton>
			<Fade in={isFinished}>
				<Alert variant='outlined'>
					<AlertTitle>Password reset email sent successfully</AlertTitle>
					To be able to log in create a new password by following the link from the email.
				</Alert>
			</Fade>
		</Form>
	);
};

export default PasswordResetForm;
