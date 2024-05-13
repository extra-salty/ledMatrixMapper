import { AnimationsTablePropsT } from '@/types/animation/animationTable.types';
import ToolbarInternalActions from '../actions/ToolbarInternalActions/ToolbarInternalActions';
import TopToolbarCustomActions from '../actions/ToolbarCustomActions/ToolbarCustomActions';
import EmptyRowsFallback from '../comps/EmptyRowsFallback';

const useComponentProps = (): AnimationsTablePropsT => {
	return {
		renderTopToolbarCustomActions: ({ table }) => (
			<TopToolbarCustomActions table={table} />
		),
		renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} />,
		renderEmptyRowsFallback: () => <EmptyRowsFallback />,
	};
};

export default useComponentProps;
