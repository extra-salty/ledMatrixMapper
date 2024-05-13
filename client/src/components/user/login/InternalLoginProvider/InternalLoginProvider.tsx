import useSWRMutation from 'swr/mutation';
import useApp from '@/providers/AppProvider/useApp';
import { Routes, useRoutes } from '@/misc/hooks/useRoutes/useRoutes';
import { FormEvent } from 'react';
import { RealmErrorMessages, RealmErrorCodes } from '@/types/realm/realm.types';
import { Credentials, MongoDBRealmError } from 'realm-web';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import Form from '@/components/user/forms/Form/Form';
import Password from '@/components/account/Password/Password';
import EmailAddress from '@/components/account/EmailAddress/EmailAddress';

const InternalLoginProvider = () => {
	const { login } = useApp();

	const goToReset = useRoutes(Routes.Reset);

	const handleLogin = async (_: string, { arg }: { arg: FormData }) => {
		const email = arg.get('email') as string;
		const password = arg.get('password') as string;
		const credentials = Credentials.emailPassword(email, password);

		await login(credentials);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		reset();
		trigger(formData);
	};

	const { isMutating, error, trigger, reset } = useSWRMutation(
		'/login/internal',
		handleLogin,
		{
			throwOnError: false,
		},
	);

	const handleError = (e: MongoDBRealmError) => {
		switch (e?.errorCode) {
			case RealmErrorCodes.InvalidPassword:
				return RealmErrorMessages.Invalid;
			default:
				return '';
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<EmailAddress initialError={handleError(error)} />
			<Password id='password' label='Password' initialError='' enableStrength={false} />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<LoadingButton type='submit' size='large' variant='outlined' loading={isMutating}>
					LOGIN
				</LoadingButton>
				<Button onClick={goToReset}>Forgot Password?</Button>
			</Box>
		</Form>
	);
};

export default InternalLoginProvider;
