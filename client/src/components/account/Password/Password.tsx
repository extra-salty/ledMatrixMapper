import { useState, ClipboardEvent, useEffect, ChangeEvent } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { FocusEvent } from 'react';
import PasswordStrength from './PasswordStrength/PasswordStrength';

const Password = ({
	id,
	label,
	initialError,
	enableStrength = false,
}: {
	id: string;
	label: string;
	initialError?: string;
	enableStrength: boolean;
}) => {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

	const handlePasswordChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const password = target.value.trim();
		setPassword(password);
		setError('');
	};

	const handlePreventDefault = (event: ClipboardEvent<HTMLInputElement>) =>
		event.preventDefault();

	const handleOnFocus = (event: FocusEvent<HTMLInputElement>) =>
		setAnchorEl(event.target);

	const handleOnBlur = () => setAnchorEl(null);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const showError = !!password && !!error;

	useEffect(() => {
		if (initialError) setError(initialError);
	}, [initialError]);

	return (
		<>
			<TextField
				required
				fullWidth
				id={id}
				name={id}
				label={label}
				value={password}
				error={showError}
				helperText={showError ? error : ' '}
				type={showPassword ? 'text' : 'password'}
				autoComplete='current-password'
				inputProps={{
					...(enableStrength && {
						pattern: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}',
					}),
				}}
				onChange={handlePasswordChange}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
				onCopy={handlePreventDefault}
				onPaste={handlePreventDefault}
				InputProps={{
					endAdornment: (
						<>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</>
					),
				}}
			/>
			{enableStrength && (
				<PasswordStrength anchorEl={anchorEl} password={password} setError={setError} />
			)}
		</>
	);
};

export default Password;
