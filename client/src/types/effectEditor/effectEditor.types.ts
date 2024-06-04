import { FrameHistoryT } from '../effect/effect.types';

export type EffectSliceT = {
	selectedFrames: number[];
	frameHistory: FrameHistoryT[];
	playerOptions: EffectPlayerOptionsT;
	gridOptions: EffectGridOptionsT;
};

export type EffectGridOptionsT = {
	cellSize: number;
	borderEnabled: boolean;
	indexEnabled: boolean;
	blur: number;
};

export type UpdateGridOptionsT<K extends keyof EffectGridOptionsT> = {
	key: K;
	value: EffectGridOptionsT[K];
};

export type EffectPlayerOptionsT = {
	castEnabled: boolean;
	repeatEnabled: boolean;
	borderEnabled: boolean;
	indexEnabled: boolean;
	blur: number;
	refreshRate: number;
};

export enum EffectPlayerOptionsKeys {
	castEnabled = 'castEnabled',
	repeatEnabled = 'repeatEnabled',
	borderEnabled = 'borderEnabled',
	indexEnabled = 'indexEnabled',
	blur = 'blur',
}

export type UpdatePlayerOptionsT<K extends keyof EffectPlayerOptionsT> = {
	key: K;
	value: EffectPlayerOptionsT[K];
};

// export type UpdateKeyValuePayloadT<T> = {
// 	key: keyof T;
// 	value: T[keyof T];
// };
