import { memo } from 'react';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

dayjs.extend(duration);

export const genericMemo: <T>(component: T) => T = memo;

// export const objectToQueryString = (formData) => {
// 	const data = [...formData.entries()];
// 	const asString = data
// 		.map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
// 		.join('&');
// 	return asString;
// };

export const formDataToObj = (formData: FormData) => {
	return Object.fromEntries(formData.entries());
};

export const decodeJwtResponse = (token: any) => {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	let jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
	return JSON.parse(jsonPayload);
};

export const formatDuration = (durationMs: number) =>
	dayjs.duration(durationMs).format('mm:ss:SSS');
