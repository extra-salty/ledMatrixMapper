import { useDispatch } from 'react-redux';
import { effectsDataActions } from '@/libs/redux/features/effects/data/slice';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { MouseEvent } from 'react';
import { CheckBoxOutlineBlank, DisabledByDefault, OpenWith } from '@mui/icons-material';
import { Box, Checkbox, IconButton, ToggleButton, Tooltip } from '@mui/material';

const FrameSelector = ({
	frameId,
	disabled,
	isDragging,
	dragAttributes,
	dragListeners,
}: {
	frameId: string;
	disabled: boolean;
	isDragging: boolean;
	dragAttributes: DraggableAttributes;
	dragListeners: SyntheticListenerMap | undefined;
}) => {
	const dispatch = useDispatch();

	const handleChange = () =>
		dispatch(
			effectsDataActions.updateFrame({ frameId, key: 'disabled', value: !disabled }),
		);

	const handleDisableChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(
			effectsDataActions.updateFrame({ frameId, key: 'disabled', value: !disabled }),
		);

	return (
		<Box>
			<IconButton
				size='small'
				sx={{
					cursor: isDragging ? 'grabbing' : 'grab',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					borderRadius: '0px',
					borderTopLeftRadius: '4px',
				}}
				{...dragListeners}
				{...dragAttributes}
			>
				<OpenWith fontSize='small' />
			</IconButton>
			<Tooltip title={disabled ? 'Enable Frame' : 'Disable Frame'}>
				<Checkbox
					size='small'
					checked={disabled}
					onChange={handleDisableChange}
					icon={<CheckBoxOutlineBlank />}
					checkedIcon={<DisabledByDefault />}
					sx={{
						padding: '4px',
						border: '1px solid rgba(255, 255, 255, 0.12)',
						borderRadius: '0px',
					}}
				/>
			</Tooltip>
		</Box>
	);
};

export default FrameSelector;
