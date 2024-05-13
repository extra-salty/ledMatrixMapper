import { EffectsTablePropsT } from '@/types/effects/effectTable.types';
import ToolbarCustomActions from '../actions/ToolbarCustomActions/ToolbarCustomActions';
import ToolbarInternalActions from '../actions/ToolbarInternalActions/ToolbarInternalActions';

const useComponentProps = (): EffectsTablePropsT => {
	return {
		renderTopToolbarCustomActions: ({ table }) => <ToolbarCustomActions table={table} />,
		renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} />,
	};
};

export default useComponentProps;
