import { AccessTime, Photo, Repeat, Rule, Speed, Timelapse } from '@mui/icons-material';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import {
	AnimationsTableColumnsPartialT,
	AnimationsTableColumnsT,
} from '@/types/animation/animationTable.types';
import RowActionMenu from '../actions/RowActionMenu/RowActionMenu';
import PlaylistNumberInput from '../components/NumberInput/NumberInput';
import PlaylistTextInput from '../components/TextInput/TextInput';
import EffectSelect from '../components/EffectSelect/EffectSelect';
import DisableToggle from '../components/DisableToggle/DisableToggle';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { MRT_ExpandAllButton, MRT_ExpandButton } from 'material-react-table';
import { TimeClock } from '@mui/x-date-pickers';

const useColumns = (): AnimationsTableColumnsT[] => {
	const staticProps: AnimationsTableColumnsPartialT = {
		enableColumnActions: false,
		enableResizing: false,
		enablePinning: false,
		enableHiding: false,
		visibleInShowHideMenu: false,
	};

	return [
		{
			accessorKey: 'name',
			header: 'Name',
			minSize: 200,
			grow: true,
			enablePinning: false,
			enableHiding: false,
			Header: ({ table }) => (
				<Stack direction='row' alignItems='center' gap={2}>
					<MRT_ExpandAllButton table={table} />
					<Tooltip title='Index'>
						<Box>#</Box>
					</Tooltip>
					<Box>Name</Box>
				</Stack>
			),
			Edit: ({ row, table }) => {
				const { original, parentId, index } = row;
				const modParentId = parentId
					? parentId
							?.split('.')
							.map((x) => Number(x) + 1)
							.join('.') + '.'
					: '';
				const finalId = `${modParentId}${index + 1}.`;

				return (
					<Stack direction='row' alignItems='center' gap={2} width={'100%'}>
						<MRT_ExpandButton row={row} table={table} />
						<Typography variant='body2'>{finalId}</Typography>
						{original.type === AnimationChildrenTypesT.effect ? (
							<EffectSelect row={original} />
						) : (
							<PlaylistTextInput propertyKey='name' row={original} />
						)}
					</Stack>
				);
			},
		},
		{
			accessorKey: 'description',
			header: 'Description',
			size: 120,
			enableResizing: true,
			enableEditing: true,
			Edit: ({ row: { original } }) => (
				<PlaylistTextInput propertyKey='description' row={original} />
			),
		},
		{
			accessorKey: 'repeat',
			header: 'Frames',
			filterVariant: 'range',
			size: 48,
			enableResizing: false,
			Header: () => (
				<Tooltip title='Repeat'>
					<Repeat fontSize='small' />
				</Tooltip>
			),
			Edit: ({ row: { original } }) => {
				switch (original.type) {
					case AnimationChildrenTypesT.animation: {
						return null;
					}
					default: {
						return <PlaylistNumberInput propertyKey='repeat' row={original} />;
					}
				}
			},
		},
		{
			accessorKey: 'speed',
			header: 'Speed',
			filterVariant: 'range',
			size: 48,
			enableResizing: false,
			Header: () => (
				<Tooltip title='Speed (disabled)'>
					<Speed fontSize='small' />
				</Tooltip>
			),
			Edit: ({ row: { original } }) => {
				switch (original.type) {
					case AnimationChildrenTypesT.animation: {
						return null;
					}
					default: {
						return original.speed;
						// return <PlaylistNumberInput propertyKey='speed' row={original} />;
					}
				}
			},
		},
		// {
		// 	accessorKey: 'timestamp',
		// 	header: 'Timestamp',
		// 	// filterVariant: 'range',
		// 	size: 48,
		// 	enableResizing: false,
		// 	enableEditing: false,
		// 	Header: () => (
		// 		<Tooltip title='Duration'>
		// 			<TimeClock />
		// 		</Tooltip>
		// 	),
		// },
		{
			accessorKey: 'duration',
			header: 'Duration',
			// filterVariant: 'range',
			size: 48,
			enableResizing: false,
			enableEditing: false,
			Header: () => (
				<Tooltip title='Duration (ms)'>
					<Timelapse fontSize='small' />
				</Tooltip>
			),
		},
		{
			accessorKey: 'startTime',
			header: 'Start Time',
			// filterVariant: 'range',
			size: 48,
			enableResizing: false,
			enableEditing: false,
			Header: () => (
				<Tooltip title='Start Time'>
					<AccessTime fontSize='small' />
				</Tooltip>
			),
		},
		{
			accessorKey: 'framesLength',
			header: 'Number of Frames',
			// filterVariant: 'range',
			size: 48,
			enableResizing: false,
			enableEditing: false,
			Header: () => (
				<Tooltip title='Number of Frames'>
					<Photo fontSize='small' />
				</Tooltip>
			),
		},
		{
			accessorKey: 'disable',
			header: 'Disable',
			size: 48,
			enableResizing: false,
			Header: () => (
				<Tooltip title='Disable'>
					<Rule fontSize='small' />
				</Tooltip>
			),
			Edit: ({ row: { original } }) => <DisableToggle row={original} />,
		},
		{
			accessorKey: 'actions',
			header: 'Actions',
			...staticProps,
			size: 24,
			minSize: 24,
			enableEditing: false,
			Header: () => <div></div>,
			Cell: ({ row: { original, id } }) => (
				<RowActionMenu originalRow={original} rowId={id} />
			),
		},
	];
};

export default useColumns;
