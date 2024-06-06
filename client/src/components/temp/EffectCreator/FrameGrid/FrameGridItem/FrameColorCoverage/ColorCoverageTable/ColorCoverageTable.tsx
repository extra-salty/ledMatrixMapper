import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { colorCountT } from '../FrameColorCoverage';

type ColorTableRowT = {
	index: number;
	count: number;
	hue: number;
	saturation: number;
	lightness: number;
};

const ColorCoverageTable = ({ colorCount }: { colorCount: colorCountT }) => {
	const rows = Object.values(colorCount).map(({ color, count }, index) => {
		const { hue, saturation, brightness: lightness } = color;

		return {
			index,
			count,
			hue,
			saturation,
			lightness,
		};
	});

	const columns: GridColDef<ColorTableRowT>[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'hue',
			headerName: 'Last name',
			width: 50,
		},
		{
			field: 'saturation',
			headerName: 'Age',
			type: 'number',
			width: 50,
		},
		{
			field: 'ligthness',
			headerName: 'Full name',
			width: 50,
		},
	];

	return <DataGrid rows={rows} columns={columns} checkboxSelection />;
};

export default ColorCoverageTable;
