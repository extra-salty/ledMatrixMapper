import { ToggleButtonProps } from '@/types/components/components.types';
import { Flip, GridOff, GridOn } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const ImageCropperOptions = ({
	disableAll,
	options,
	setOptions,
}: {
	disableAll: boolean;
	options: string[];
	setOptions: Dispatch<SetStateAction<string[]>>;
}) => {
	const isGridOn = options.includes('grid');

	const handleOptionsChange = (event: React.MouseEvent<HTMLElement>, options: string[]) =>
		setOptions(options);

	const buttons: ToggleButtonProps[] = [
		{
			value: 'grid',
			icon: isGridOn ? <GridOn /> : <GridOff />,
			tootlip: isGridOn ? 'Hide Grid' : 'Show Grid',
		},
		{
			value: 'horizontal-flip',
			icon: <Flip />,
			tootlip: 'Flip Horizontally',
			disabled: true,
		},
		{
			value: 'vertical-flip',
			icon: <Flip sx={{ rotate: '90deg' }} />,
			tootlip: 'Flip Vertically',
			disabled: true,
		},
	];

	return (
		<ToggleButtonGroup
			value={options}
			onChange={handleOptionsChange}
			aria-label='Crop options'
		>
			{buttons.map(({ value, icon, disabled, tootlip }, i) => (
				<ToggleButton
					key={i}
					size='small'
					disabled={disableAll || disabled}
					value={value}
					aria-label={value}
				>
					<Tooltip title={tootlip}>{icon}</Tooltip>
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	);
};

export default ImageCropperOptions;
