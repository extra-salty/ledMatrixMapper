import { ActionButtonProps } from '@/types/components/components.types';
import { IconButton, Tooltip } from '@mui/material';

const ToolbarButton = ({ text, disabled, icon, onClick }: ActionButtonProps) => {
	return (
		<Tooltip title={text}>
			<span>
				<IconButton disabled={disabled} onClick={onClick}>
					{icon}
				</IconButton>
			</span>
		</Tooltip>
	);
};

export default ToolbarButton;
