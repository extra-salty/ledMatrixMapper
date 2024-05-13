import useApp from '@/providers/AppProvider/useApp';
import useSWRMutation from 'swr/mutation';
import { FormEvent, useState } from 'react';
import { MongoDBRealmError } from 'realm-web';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm/realm.types';
import { Alert, AlertTitle, Box, Fade } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Form from '../Form/Form';
import FirstName from '../../../account/FirstName/FirstName';
import LastName from '../../../account/LastName/LastName';
import EmailAddress from '../../../account/EmailAddress/EmailAddress';
import Password from '@/components/account/Password/Password';

const RegisterForm = () => {
	const { app } = useApp();

	const [passwordError, setPasswordError] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		reset();
		setPasswordError('');

		const formData = new FormData(event.currentTarget);
		const firstPassword = formData.get('firstPassword') as string;
		const secondPassword = formData.get('secondPassword') as string;
		const email = formData.get('email') as string;

		if (firstPassword !== secondPassword) {
			setPasswordError('Passwords do not match.');
		} else {
			trigger({ email, password: secondPassword });
		}
	};

	const handleCreate = async (
		_: string,
		{ arg }: { arg: { email: string; password: string } },
	) => {
		const { email, password } = arg;

		await app.emailPasswordAuth.registerUser({ email, password });
		return true;
	};

	const {
		data: isFinished,
		isMutating,
		error,
		trigger,
		reset,
	} = useSWRMutation('/account/create', handleCreate, {
		throwOnError: false,
	});

	const handleError = (e: MongoDBRealmError) => {
		switch (e?.errorCode) {
			case RealmErrorCodes.AccountNameInUse:
				return RealmErrorMessages.InUse;
			default:
				return '';
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
				<FirstName />
				<LastName />
			</Box>
			<EmailAddress initialError={handleError(error)} />
			<Password id='firstPassword' label='Password' enableStrength />
			<Password
				id='secondPassword'
				label='Reenter Password'
				initialError={passwordError}
				enableStrength
			/>
			<LoadingButton
				type='submit'
				size='large'
				variant='outlined'
				loading={isMutating}
				sx={{ marginRight: 'auto' }}
			>
				Sign Up
			</LoadingButton>
			<Fade in={isFinished}>
				<Alert variant='outlined'>
					<AlertTitle>Confirmation email sent successfully</AlertTitle>
					To be able to log in verify your account by following the link from the email.
				</Alert>
			</Fade>
		</Form>
	);
};

export default RegisterForm;
