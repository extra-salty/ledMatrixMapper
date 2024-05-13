import useApp from '@/providers/AppProvider/useApp';
import { useState } from 'react';
import {
	CredentialResponse,
	GoogleLogin,
	GoogleOAuthProvider,
} from '@react-oauth/google';
import { Credentials } from 'realm-web';
import { Alert, Box, Snackbar } from '@mui/material';
import CustomGoogleButton from './CustomGoogleButton/CustomGoogleButton';

const GoogleLoginProvider = () => {
	const { login } = useApp();

	const [isGoogleFailure, setGoogleFailure] = useState<boolean>(false);
	const [isGoogleLoginFailed, setGoogleLoginFailed] = useState<boolean>(false);
	const [ripple, setRipple] = useState<boolean>(false);

	const handleClose = () => setGoogleLoginFailed(false);

	const handleLogin = async (response: CredentialResponse) => {
		if (response.credential) {
			try {
				const credentials = Credentials.google({ idToken: response.credential });

				login(credentials);
			} catch (e) {
				console.log('🚀 ~ handleLogin ~ e:', e);
			}
		}
	};

	return (
		<>
			<GoogleOAuthProvider
				clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
				onScriptLoadError={() => setGoogleFailure(true)}
			>
				<Snackbar
					open={isGoogleLoginFailed}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert severity='error'>Google login failed. Please try again.</Alert>
				</Snackbar>
				<Box
					sx={{
						position: 'relative',
						border: '1px solid transparent',
						transition: 'border-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
						'&:hover': {
							border: '1px solid white',
							borderRadius: 1,
							transition: 'border-color 100ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
						},
					}}
				>
					<CustomGoogleButton ripple={ripple} />
					<Box sx={{ opacity: '0', height: '44px' }}>
						<GoogleLogin
							useOneTap
							onSuccess={handleLogin}
							onError={() => setGoogleLoginFailed(true)}
						/>
					</Box>
				</Box>
			</GoogleOAuthProvider>
		</>
	);
};

export default GoogleLoginProvider;

// onMouseLeave={() => {
// 	setRipple(false);
// 	console.log('leave');
// }}
// onMouseEnter={() => {
// 	setRipple(true);
// 	console.log('enter');
// }}
