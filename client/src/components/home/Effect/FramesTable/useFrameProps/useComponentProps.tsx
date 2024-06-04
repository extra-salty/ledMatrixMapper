import { EffectsTablePropsT } from '@/types/effect/effectTable.types';

const useComponentProps = (): EffectsTablePropsT => {
	return {
		// renderTopToolbarCustomActions: ({ table }) => <ToolbarCustomActions table={table} />,
		// renderToolbarInternalActions: ({ table }) => <ToolbarInternalActions table={table} />,
		// renderEmptyRowsFallback: () => <EmptyRowsFallback />,
	};
};

export default useComponentProps;
