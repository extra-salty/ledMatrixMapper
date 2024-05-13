import { Dangerous } from '@mui/icons-material';
import { ZxcvbnResult, zxcvbnAsync } from '@zxcvbn-ts/core';
import { useDeferredValue, useEffect, useState } from 'react';

export enum PasswordStrengthT {
	WEAK = 'Weak',
	VERY_WEAK = 'Very weak',
	ACCEPTABLE = 'Acceptable',
	STRONG = 'Strong',
	VERY_STRONG = 'Very strong',
}

const usePasswordStrength = (password: string) => {
	const [result, setResult] = useState<ZxcvbnResult | null>(null);

	const deferredPassword = useDeferredValue(password);
	const score = result?.score || 0;

	const resultDetails: Record<
		number,
		{ color: 'error' | 'warning' | 'success'; icon: any; text: string }
	> = {
		0: {
			color: 'error',
			icon: <Dangerous color='error' />,
			text: PasswordStrengthT.VERY_WEAK,
		},
		1: {
			color: 'error',
			icon: <Dangerous color='error' />,
			text: PasswordStrengthT.WEAK,
		},
		2: {
			color: 'warning',
			icon: <Dangerous color='error' />,
			text: PasswordStrengthT.ACCEPTABLE,
		},
		3: {
			color: 'success',
			icon: <Dangerous color='error' />,
			text: PasswordStrengthT.STRONG,
		},
		4: {
			color: 'success',
			icon: <Dangerous color='error' />,
			text: PasswordStrengthT.VERY_STRONG,
		},
	};

	useEffect(() => {
		zxcvbnAsync(deferredPassword).then((response) => setResult(response));
	}, [deferredPassword]);

	return { result, resultDetail: resultDetails[score] };
};

export default usePasswordStrength;
