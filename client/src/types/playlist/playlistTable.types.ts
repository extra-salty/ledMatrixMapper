import { TableStateT } from '../tables/tables.types';

export type PlaylistTableT = {
	order: string[];
	internal: PlaylistStateT;
	focusedRow: string | undefined;
};

export type PlaylistStateT = Omit<TableStateT, 'sorting'>;

export type InternalStatePayloadT<K extends keyof PlaylistStateT> = {
	key: K;
	value: PlaylistStateT[K];
};
