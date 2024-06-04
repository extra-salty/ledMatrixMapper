import { IconButton } from '@mui/material';
import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import styles from './FrameHistoryTable.module.scss';
import { FrameHistoryTypes } from '@/types/effect/effect.types';

export type FrameHistoryDataT = {
	index: number;
	frameIndex: number;
	type: FrameHistoryTypes;
};

const FrameHistoryTable = () => {
	// const history = useFrameHistory();

	// const header: UITableHeaderProps<FrameHistoryDataT>[] = [
	// 	{
	// 		id: 'index',
	// 		header: '#',
	// 	},
	// 	{
	// 		id: 'frameIndex',
	// 		header: 'Frame index',
	// 	},
	// 	{
	// 		id: 'type',
	// 		header: 'Type',
	// 	},
	// ];

	// const data: FrameHistoryDataT[] = history.map((item, i) => ({
	// 	index: ++i,
	// 	frameIndex: item.frameIndex,
	// 	type: item.type,
	// }));

	return (
		<div>
			<IconButton aria-label='delete'>
				<UndoOutlined />
			</IconButton>
			<IconButton aria-label='delete'>
				<RedoOutlined />
			</IconButton>
			<div className={styles.wrapper}>
				{/* <UITable header={header} data={data} /> */}
			</div>
		</div>
	);
};

export default FrameHistoryTable;
