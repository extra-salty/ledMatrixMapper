import { Switch } from '@mui/material';

const DisableSwitch = ({ isFreezed, setIsFreezed }: { isFreezed: boolean; setIsFreezed: any }) => {
	return <Switch checked={isFreezed} onChange={() => {}} aria-label='disable-switch' />;
};

export default DisableSwitch;
