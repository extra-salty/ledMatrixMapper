import {
	AnimationsTableColumnsPartialT,
	AnimationsTableColumnsT,
} from '@/types/animation/animationTable.types';
import { AnimationChildrenTypesT } from '@/types/animation/animation.types';
import { MRT_ExpandAllButton, MRT_ExpandButton } from 'material-react-table';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Numbers, TableRows, ViewColumn } from '@mui/icons-material';
import RowActionMenu from '../actions/RowActionMenu/RowActionMenu';
import dayjs from 'dayjs';

const useColumns = (): AnimationsTableColumnsT[] => {
	const staticProps: AnimationsTableColumnsPartialT = {
		enableColumnActions: false,
		enableResizing: false,
		enablePinning: false,
		enableHiding: false,
		visibleInShowHideMenu: false,
	};

	const dateTimeFormat = 'YY/MM/DD HH:mm:ss';

	return [
		// {
		// 	accessorKey: 'rowId',
		// 	header: 'Row Index',
		// 	size: 80,
		// 	grow: false,
		// 	...staticProps,
		// 	enableEditing: false,
		// 	enableSorting: false,
		// 	enableColumnFilter: false,
		// 	enableGlobalFilter: false,
		// 	Header: () => (
		// 		<Tooltip title='Index'>
		// 			<Numbers />
		// 		</Tooltip>
		// 	),
		// },
		{
			accessorKey: 'name',
			header: 'Name',
			filterVariant: 'text',
			columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith', 'endsWith'],
			size: 200,
			minSize: 150,
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
			Cell: ({ row, table }) => {
				const { original, parentId, index } = row;
				const modParentId = parentId
					? parentId
							?.split('.')
							.map((x) => Number(x) + 1)
							.join('.') + '.'
					: '';
				const finalId = `${modParentId}${index + 1}.`;

				return (
					<Stack direction='row' alignItems='center' gap={2}>
						<MRT_ExpandButton row={row} table={table} />
						<Typography variant='body2'>{finalId}</Typography>
						<Box>{row.original.name}</Box>
					</Stack>
				);
			},
		},
		{
			accessorKey: '_id',
			header: 'ID',
			size: 200,
			enableResizing: false,
		},
		{
			accessorKey: 'description',
			header: 'Description',
			minSize: 100,
			size: 150,
			maxSize: 300,
			enableResizing: true,
			enableColumnFilterModes: true,
			filterVariant: 'text',
			columnFilterModeOptions: ['equalsString', 'contains', 'startsWith', 'endsWith'],
		},
		{
			accessorKey: 'width',
			header: 'Width',
			size: 50,
			grow: true,
			enableResizing: false,
			enableSorting: true,
			filterVariant: 'multi-select',
			enableColumnFilterModes: true,
			Header: () => (
				<Tooltip title='Columns'>
					<ViewColumn fontSize='small' />
				</Tooltip>
			),
		},
		{
			accessorKey: 'height',
			header: 'Height',
			size: 50,
			grow: true,
			enableResizing: false,
			enableSorting: true,
			filterVariant: 'multi-select',
			Header: () => (
				<Tooltip title='Rows'>
					<TableRows fontSize='small' />
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
			enableColumnActions: false,
			enableColumnFilter: false,
			enablePinning: true,
			enableSorting: false,
			enableResizing: false,
			enableColumnDragging: false,
			visibleInShowHideMenu: false,
			size: 40,
			Header: () => <div></div>,
			Cell: ({ row }) => {
				return row.original.type === AnimationChildrenTypesT.animation ? (
					<RowActionMenu row={row.original} />
				) : null;
			},
		},
	];
};

export default useColumns;

// {
// 	field: 'drag',
// 	headerName: 'Drag',
// 	sortable: false,
// 	filterable: false,
// 	disableColumnMenu: true,
// 	width: 60,
// 	renderCell: (params: GridRenderCellParams<any, string>) => (
// 		<AnimationTableDragButton animation={params.row} />
// 		// <Tooltip title={params.row.description}>
// 		// 	<div>Asd</div>
// 		// </Tooltip>
// 	),
// },

// {
// 	accessorKey: 'framesLength',
// 	header: 'Frames',
// 	filterVariant: 'range',
// 	size: 60,
// 	enableResizing: false,
// 	Header: () => (
// 		<Tooltip title='Number of frames'>
// 			<Layers />
// 		</Tooltip>
// 	),
// },
// {
// 	accessorKey: 'duration',
// 	header: 'Duration',
// 	// filterVariant: 'range',
// 	size: 60,
// 	enableResizing: false,
// 	Header: () => (
// 		<Tooltip title='Duration'>
// 			<Timelapse />
// 		</Tooltip>
// 	),
// 	Cell: ({ cell }) => Number((cell.getValue<number>() / 1000).toFixed(2)),
// },
// {
// 	accessorKey: 'power',
// 	header: 'Power consumption',
// 	size: 60,
// 	// sortable: false,
// 	enableResizing: false,
// 	Header: () => (
// 		<Tooltip title='Power consumption'>
// 			<Bolt />
// 		</Tooltip>
// 	),
// },
