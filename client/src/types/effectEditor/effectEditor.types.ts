export type EffectEditorSliceT = {
	playerOptions: EffectPlayerOptionsT;
	gridOptions: FrameGridOptionsT;
};

export type FrameGridOptionsT = {
	toggle: {
		indexEnabled: boolean;
		borderEnabled: boolean;
		transitionEnabled: boolean;
	};
	select: {
		numberOfColumns: number;
		blur: number;
	};
	gridWidth: number;
};

export type UpdateGridOptionsT<K extends keyof FrameGridOptionsT> = {
	key: K;
	value: FrameGridOptionsT[K];
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
