export enum RealmErrorCodes {
	AccountNameInUse = 'AccountNameInUse',
	UserNotFound = 'UserNotFound',
	InvalidPassword = 'InvalidPassword',
	UserpassTokenInvalid = 'UserpassTokenInvalid',
	BadRequest = 'BadRequest',
}

export enum RealmErrorMessages {
	InUse = 'Email address already in use or waiting for verification.',
	NotFound = 'Email address not found.',
	Invalid = 'Address not found or password does not match.',
	ExpiredToken = 'Confirmation email is expired or invalid. Resend the confirmation email on the login page.',
	InvalidToken = 'The confirmation tokens are missing from the url. Try to reopen the link from the confirmation email.',
	WentWrong = 'Something went wrong. Please try again.',
}
