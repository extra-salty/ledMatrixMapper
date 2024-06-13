import { MenuItem, ListItemIcon, ListItemText, SvgIconProps } from '@mui/material';
import { ReactElement, MouseEvent } from 'react';

export type MenuItemProps = {
	id?: string;
	text?: string;
	icon?: ReactElement<SvgIconProps>;
	hidden?: boolean;
	disabled?: boolean;
	tooltip?: string;
	divider?: boolean;
	onClick: (e: MouseEvent<HTMLElement>) => void;
};

const GenericMenuItems = ({ items }: { items: MenuItemProps[] }) => {
	return (
		<>
			{items.map(({ id, icon, text, divider, disabled, hidden, onClick }, i) => {
				return hidden ? null : (
					<MenuItem key={id || i} divider={divider} disabled={disabled} onClick={onClick}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText>{text}</ListItemText>
					</MenuItem>
				);
			})}
		</>
	);
};

export default GenericMenuItems;
