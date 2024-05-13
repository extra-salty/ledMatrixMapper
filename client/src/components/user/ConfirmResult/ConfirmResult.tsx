import useSWR from 'swr';
import useApp from '@/providers/AppProvider/useApp';
import { RealmErrorCodes, RealmErrorMessages } from '@/types/realm/realm.types';
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { MongoDBRealmError } from 'realm-web';

const ConfirmResult = ({ token, tokenId }: { token: string; tokenId: string }) => {
	const { app } = useApp();

	const handleConfirm = async () =>
		await app.emailPasswordAuth.confirmUser({ token, tokenId });

	const { error, isLoading } = useSWR('/user/confirm', handleConfirm, {
		shouldRetryOnError: false,
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
		<>
			{isLoading ? (
				<Alert variant='outlined' severity='info' icon={<CircularProgress size={22} />}>
					<AlertTitle>Confirmation is pending</AlertTitle>
					Wait until the confirmation is finalized.
				</Alert>
			) : (
				<>
					{error ? (
						<Alert variant='outlined' severity='error'>
							<AlertTitle>Confirmation failed</AlertTitle>
							{handleError(error)}
						</Alert>
					) : (
						<Alert variant='outlined' severity='success'>
							<AlertTitle>Confirmation is succesfull</AlertTitle>
							Go back and log in into your user account.
						</Alert>
					)}
				</>
			)}
		</>
	);
};

export default ConfirmResult;
