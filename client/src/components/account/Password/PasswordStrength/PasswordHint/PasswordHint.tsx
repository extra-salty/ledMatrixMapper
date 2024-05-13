import { Box, Divider, Typography } from '@mui/material';
import { ZxcvbnResult } from '@zxcvbn-ts/core';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

type TranslationsT = Record<
	string,
	{
		[key: string]: string | undefined;
	}
>;

const PasswordHint = ({
	password,
	result,
}: {
	password: string;
	result: ZxcvbnResult;
}) => {
	const translations: TranslationsT = zxcvbnEnPackage.translations;
	const warning = result?.feedback.warning;
	const suggestions: string[] = result?.feedback.suggestions;

	return (
		<>
			{!!password && (warning || !!suggestions.length) && (
				<>
					<Divider sx={{ fontSize: '12px' }}>Suggestions and warnings</Divider>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
						{warning && (
							<Typography variant='caption'>{translations.warnings[warning]}</Typography>
						)}
						{!!suggestions.length &&
							suggestions.map((suggestion) => (
								<Typography variant='caption' key={suggestion}>
									{translations.suggestions[suggestion]}
								</Typography>
							))}
					</Box>
				</>
			)}
		</>
	);
};

export default PasswordHint;
