import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { PanelResizeHandle } from 'react-resizable-panels';
import { DragHandle } from '@mui/icons-material';

const ResizeHandle = () => {
	const theme = useTheme();
	const [isDragging, setIsDragging] = useState<boolean>(false);

	return (
		<PanelResizeHandle
			style={{
				position: 'relative',
				width: '2px',
				backgroundColor: isDragging ? theme.palette.grey[500] : theme.palette.divider,
				transition: 'background-color 0.3s linear',
			}}
			onDragging={(isDragging) => setIsDragging(isDragging)}
		>
			<DragHandle
				fontSize='large'
				sx={(theme) => ({
					position: 'absolute',
					height: '18px',
					width: '22px',
					rotate: '90deg',
					left: '-50%',
					top: '50%',
					transform: 'translate(-50%, 50%)',
					border: '2px solid',
					borderRadius: '25%',
					borderColor: isDragging ? theme.palette.grey[500] : theme.palette.divider,
					// backgroundColor: theme.palette.background.paper,
					backgroundColor: '#1e1e1e',
				})}
			/>
		</PanelResizeHandle>
	);
};

export default ResizeHandle;
