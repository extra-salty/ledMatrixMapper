import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionButtonProps } from '@/types/components/components.types';
import { FrameStateT } from '@/types/effects/effect.types';
import {
	ArrowDropDown,
	InvertColors,
	RedoOutlined,
	UndoOutlined,
} from '@mui/icons-material';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import FrameMenu from '../FrameMenu/FrameMenu';
import FrameColorCoverage from '../FrameColorCoverage/FrameColorCoverage';

// : { undo, redo }
const FrameActions = ({
	frameIndex,
	frame: { id, history, data },
}: {
	frameIndex: number;
	frame: FrameStateT;
}) => {
	const dispatch = useDispatch();

	const buttonGroupRef = useRef(null);

	const [isColorCoverageOpen, setIsColorCoverageOpen] = useState<boolean>(false);
	const [isOpen, setOpen] = useState<boolean>(false);

	const buttons: ActionButtonProps[] = [
		{
			icon: <InvertColors />,
			tooltip: 'Color Coverage',
			onClick: () => setIsColorCoverageOpen(true),
		},
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
			<FrameColorCoverage
				open={isColorCoverageOpen}
				setOpen={setIsColorCoverageOpen}
				anchorEl={buttonGroupRef.current}
				frameData={data}
			/>
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
							<Button disabled={disabled} startIcon={icon} onClick={onClick} />
						</span>
					</Tooltip>
				))}
			</ButtonGroup>
		</>
	);
};

export default FrameActions;
