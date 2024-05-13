import { ActionButtonProps } from '@/types/components/components.types';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';

const GenericMenuItems = ({ items }: { items: ActionButtonProps[] }) => {
	return (
		<>
			{items.map(({ icon, text, disabled, hidden, onClick }, i) => {
				return hidden ? null : (
					<MenuItem key={i} disabled={disabled} onClick={onClick}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText>{text}</ListItemText>
					</MenuItem>
				);
			})}
		</>
	);
};

export default GenericMenuItems;
