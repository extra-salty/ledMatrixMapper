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

export type EffectPlayerOptionsT = {
	toggle: {
		castEnabled: boolean;
		repeatEnabled: boolean;
		borderEnabled: boolean;
		indexEnabled: boolean;
	};
	select: {
		blur: number;
		refreshRate: number;
	};
};
