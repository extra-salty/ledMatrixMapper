import {
	EffectTableColumnsT,
	EffectsTableColumnsPartialT,
} from '@/types/effects/effectTable.types';
import { MRT_ExpandAllButton, MRT_ExpandButton } from 'material-react-table';
import { Layers, Timelapse } from '@mui/icons-material';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import RowActionMenu from '../actions/RowActionMenu/RowActionMenu';
import TextInput from '../comps/TextInput/TextInput';
import dayjs from 'dayjs';

const useColumns = (): EffectTableColumnsT[] => {
	const staticProps: EffectsTableColumnsPartialT = {
		enableColumnActions: false,
		enableResizing: false,
		enablePinning: false,
		enableHiding: false,
		visibleInShowHideMenu: false,
		enableEditing: false,
	};

	return [
		{
			accessorKey: 'name',
			header: 'Name',
			filterVariant: 'text',
			columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith', 'endsWith'],
			size: 200,
			minSize: 100,
			grow: true,
			enableSorting: true,
			enableResizing: true,
			enablePinning: false,
			enableHiding: false,
			enableColumnDragging: false,
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
				const parentIndex = parentId ? `${Number(parentId) + 1}.` : '';

				return (
					<Stack direction='row' alignItems='center' gap={2} width={'100%'}>
						<MRT_ExpandButton row={row} table={table} />
						<Typography variant='body1'>{`${parentIndex}${index + 1}.`}</Typography>
						<TextInput propertyKey='name' row={original} />
					</Stack>
				);
			},
		},
		{
			accessorKey: 'description',
			header: 'Description',
			grow: false,
			minSize: 50,
			Edit: ({ row: { original } }) => (
				<TextInput propertyKey='description' row={original} />
			),
		},
		{
			// accessorFn: ( row) => row.effects..
			accessorKey: 'framesLength',
			header: 'Frames',
			size: 100,
			grow: false,
			enableEditing: false,
			enableResizing: false,
			Header: () => (
				<Tooltip title='Number of Frames'>
					<Layers fontSize='small' />
				</Tooltip>
			),
		},
		{
			// accessorFn: ({ framesDuration }) => `${framesDuration}ms`,
			accessorKey: 'framesDuration',
			header: 'Duration',
			size: 100,
			grow: false,
			enableEditing: false,
			enableResizing: false,
			Header: () => (
				<Tooltip title='Duration'>
					<Timelapse fontSize='small' />
				</Tooltip>
			),
		},
		{
			accessorFn: (row) => dayjs(row.dateModified).toDate(),
			id: 'dateModified',
			header: 'Modified',
			size: 120,
			grow: true,
			enableResizing: false,
			enableSorting: true,
			sortingFn: 'datetime',
			enableColumnFilter: true,
			filterVariant: 'datetime',
			Cell: ({
				row: {
					original: { id, animationId, dateModified },
				},
			}) => {
				if (id !== animationId) return null;
				return dayjs(dateModified).format(dateTimeFormat);
			},
		},
		{
			accessorFn: (row) => dayjs(row.dateCreated).toDate(),
			id: 'dateCreated',
			header: 'Created',
			size: 120,
			grow: true,
			enableResizing: false,
			enableSorting: true,
			sortingFn: 'datetime',
			enableColumnFilter: true,
			filterVariant: 'datetime',
			Cell: ({
				row: {
					original: { id, animationId, dateCreated },
				},
			}) => {
				if (id !== animationId) return null;
				return dayjs(dateCreated).format(dateTimeFormat);
			},
		},
		{
			accessorKey: 'actions',
			header: 'Actions',
			enablePinning: true,
			enableColumnFilter: false,
			enableGlobalFilter: false,
			visibleInShowHideMenu: false,
			...staticProps,
			size: 40,
			Header: () => <></>,
			Cell: ({ row }) => <RowActionMenu row={row.original} />,
		},
	];
};

export default useColumns;
