import { useDispatch } from 'react-redux';
import {
	useFrameGridOptionsSelects,
	useMaxNumberOfColumns,
} from '@/libs/redux/features/effectEditor/selectors';
import { ReactElement, memo } from 'react';
import { effectEditorActions } from '@/libs/redux/features/effectEditor/slice';
import { FrameGridOptionsT } from '@/types/effectEditor/effectEditor.types';
import { Deblur, DensityMedium } from '@mui/icons-material';
import { Box, Divider, SvgIconProps, Tooltip } from '@mui/material';
import NumberInput from '@/components/misc/NumberInput/NumberInput';

const GridOptionsSelects = () => {
	const dispatch = useDispatch();
	const { blur, numberOfColumns } = useFrameGridOptionsSelects();
	const { maxColumns, limitedColumns } = useMaxNumberOfColumns();

	const selectItems: {
		key: keyof FrameGridOptionsT['select'];
		value: number;
		min: number;
		max: number;
		title: string;
		icon: ReactElement<SvgIconProps>;
		onChange: (value: number) => void;
	}[] = [
		{
			key: 'blur',
			value: blur,
			min: 0,
			max: 10,
			title: 'Blur',
			icon: <Deblur />,
			onChange: (value: number) =>
				dispatch(effectEditorActions.updateGridSelects({ key: 'blur', value })),
		},
		{
			key: 'numberOfColumns',
			value: numberOfColumns,
			min: 1,
			max: maxColumns,
			title: 'Number of columns',
			icon: <DensityMedium sx={{ rotate: '90deg' }} />,
			onChange: (value: number) => {
				value < maxColumns &&
					value !== numberOfColumns &&
					dispatch(
						effectEditorActions.updateGridSelects({ key: 'numberOfColumns', value }),
					);
			},
		},
	];

	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				gap: 2,
				border: `1px solid ${theme.palette.divider}`,
				borderRadius: 1,
				paddingLeft: 1,
			})}
		>
			{selectItems.map(({ key, value, min, max, icon, title, onChange }, i) => (
				<Box
					key={key}
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Tooltip title={title}>{icon}</Tooltip>
					<Box sx={{ width: '50px', padding: '8px' }}>
						<NumberInput
							controlledValue={value}
							min={min}
							max={max}
							hasIncrements
							incrementAlwaysVisible
							onChange={onChange}
						/>
					</Box>
					{!(i % 2) && <Divider orientation='vertical' flexItem />}
				</Box>
			))}
		</Box>
	);
};

export default memo(GridOptionsSelects);

{
	/* <FormControl size='small'>
						<Select
							text-align='left'
							disableUnderline
							variant='standard'
							value={value}
							onChange={handleOnChange}
							sx={{ padding: 1 }}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 200,
										textAlign: 'left',
									},
								},
							}}
						>
							{Array.from(Array(11).keys()).map((index) => (
								<MenuItem key={index + 1} value={index + 1} sx={{ padding: 1 }}>
									{index + 1}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					{!(i % 2) && <Divider orientation='vertical' flexItem />} */
}
