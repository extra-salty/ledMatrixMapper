import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionButtonProps } from '@/types/components/components.types';
import { FrameStateT } from '@/types/effects/effect.types';
import { ArrowDropDown, RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import FrameMenu from '../FrameMenu/FrameMenu';

const FrameActions = ({
	frameIndex,
	frame: { id, undo, redo },
}: {
	frameIndex: number;
	frame: FrameStateT;
}) => {
	const dispatch = useDispatch();

	const [isOpen, setOpen] = useState<boolean>(false);
	const buttonGroupRef = useRef(null);

	const buttons: ActionButtonProps[] = [
		{
			icon: <UndoOutlined />,
			// disabled: !frame.undo.length,
			disabled: true,
			tooltip: 'Undo',
			onClick: () => {},
		},
		{
			icon: <RedoOutlined />,
			// disabled: !frame.redo.length,
			disabled: true,
			tooltip: 'Redo',
			onClick: () => {},
		},
		{
			icon: <ArrowDropDown />,
			tooltip: 'Actions',
			onClick: () => setOpen(true),
		},
	];

	return (
		<>
			<FrameMenu
				frameId={id}
				frameIndex={frameIndex}
				anchorEl={buttonGroupRef.current}
				isOpen={isOpen}
				setOpen={setOpen}
			/>
			<ButtonGroup
				ref={buttonGroupRef}
				size='small'
				variant='contained'
				color='inherit'
				// sx={{ backgroundColor: 'transparent' }}
			>
				{buttons.map(({ icon, tooltip: tootlip, disabled, onClick }, i) => (
					<Tooltip key={i} title={tootlip}>
						<span>
							<Button
								disabled={disabled}
								startIcon={icon}
								onClick={onClick}
								// sx={{ backgroundColor: 'transparent' }}
							/>
						</span>
					</Tooltip>
				))}
			</ButtonGroup>
		</>
	);
};

export default FrameActions;
