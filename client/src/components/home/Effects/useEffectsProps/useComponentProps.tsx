import { EffectsTablePropsT } from '@/types/effect/effectTable.types';
import ToolbarCustomActions from '../actions/ToolbarCustomActions/ToolbarCustomActions';
import ToolbarInternalActions from '../actions/ToolbarInternalActions/ToolbarInternalActions';
import EmptyRowsFallback from '../comps/EmptyRowsFallback/EmptyRowsFallback';

const useComponentProps = (): EffectsTablePropsT => {
	return {
		renderTopToolbarCustomActions: ({ table }) => <ToolbarCustomActions table={table} />,
		renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} />,
		renderEmptyRowsFallback: () => <EmptyRowsFallback />,
	};
};

export default useComponentProps;
