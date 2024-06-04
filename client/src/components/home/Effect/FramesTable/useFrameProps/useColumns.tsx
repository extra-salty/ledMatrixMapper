import {
	EffectTableColumnsT,
	EffectsTableColumnsPartialT,
} from '@/types/effect/effectTable.types';

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
			accessorKey: 'duration',
			header: 'Duration',
			size: 100,
			grow: false,
			enableEditing: false,
			enableResizing: false,
			Header: () => (
				<></>
				// <Tooltip title='Duration'>
				// 	<Timelapse fontSize='small' />
				// </Tooltip>
			),
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
			// Cell: ({ row }) => <RowActionMenu row={row.original} />,
		},
	];
};

export default useColumns;
