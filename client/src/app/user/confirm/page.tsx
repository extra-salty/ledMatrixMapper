'use client';
import { useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import ConfirmResult from '@/components/user/ConfirmResult/ConfirmResult';

const Confirm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token') || '';
	const tokenId = searchParams.get('tokenId') || '';

	return (
		<>
			<Typography variant='h4'>User account confirmation</Typography>
			<ConfirmResult token={token} tokenId={tokenId} />
		</>
	);
};

export default Confirm;
