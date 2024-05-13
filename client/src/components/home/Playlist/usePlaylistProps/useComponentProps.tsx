import { AnimationsTablePropsT } from '@/types/animation/animationTable.types';
import ToolbarInternalActions from '../actions/ToolbarInternalActions/ToolbarInternalActions';
import PlaylistCustomActions from '../actions/ToolbarCustomActions/ToolbarCustomActions';
import EmptyRowsFallback from '../components/EmptyRowsFallback';

const useComponentProps = (): AnimationsTablePropsT => {
	return {
		renderTopToolbarCustomActions: ({ table }) => <PlaylistCustomActions table={table} />,
		renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} />,
		renderEmptyRowsFallback: () => <EmptyRowsFallback />,
	};
};

export default useComponentProps;
