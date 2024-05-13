import { MRT_ColumnDef, MRT_TableInstance, MRT_TableOptions } from 'material-react-table';
import { TableStateT } from '../tables/tables.types';

export type EffectTableT = {
	internal: EffectsTableStateT;
	focusedRow: string | undefined;
};

export type EffectsTableStateT = Omit<
	TableStateT,
	'sorting' | 'isSaving' | 'isFullScreen'
>;

export type InternalStatePayloadT<K extends keyof EffectsTableStateT> = {
	key: K;
	value: EffectsTableStateT[K];
};

export type EffectsTableRowT = {
	id: string;
	animationId: string;
	name: string;
	description?: string;
	framesLength?: number;
	framesDuration?: number;
	effects?: EffectsTableRowT[];
};

export type EffectTableColumnsT = MRT_ColumnDef<EffectsTableRowT>;
export type EffectsTablePropsT = Partial<MRT_TableOptions<EffectsTableRowT>>;
export type EffectsTableColumnsPartialT = Partial<EffectTableColumnsT>;
export type EffectsTableInstanceT = MRT_TableInstance<EffectsTableRowT>;
