import { ActionButtonProps } from '@/types/components/components.types';
import { IconButton, Tooltip } from '@mui/material';

const GenericActions = ({
	actions,
	disableAll,
}: {
	actions: ActionButtonProps[];
	disableAll?: boolean;
}) => {
	return (
		<>
			{actions.map(({ text, icon, disabled, onClick }, i) => (
				<Tooltip key={i} title={text}>
					<span>
						<IconButton disabled={disabled || disableAll} onClick={onClick}>
							{icon}
						</IconButton>
					</span>
				</Tooltip>
			))}
		</>
	);
};

export default GenericActions;
