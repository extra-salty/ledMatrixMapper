import { MatrixSizeT } from '../animation/animation.types';
import { ColorT } from '../color/color.types';
import { CoordinateT } from '../misc/misc.types';
import {
	EffectCollectionStateT,
	EffectStateT,
	FrameStateT,
	TransitionT,
} from './effect.types';

export type EffectsSliceT = {
	activeEffect: ActiveEffectT | undefined;
	animations: EffectCollectionStateT;
	color: {
		selectedColor: ColorT;
		colorHistory: ColorT[];
	};
	options: {
		activeMatrixSize: MatrixSizeT | undefined;
		activeColorAction: ColorActions;
		activeTransition: TransitionT;
		brushSize: number;
	};
	selection: {
		frameCellSelection: FrameCellSelectionT | undefined;
		colorActionCoordinate: ColorActionCoordinateT | undefined;
	};
};

export type FrameCellSelectionT = {
	frameId: string;
	startCoordinate: CoordinateT;
	endCoordinate: CoordinateT;
	selectCoordinate: CoordinateT | undefined;
};

export type ColorActionCoordinateT = { frameId: string; coordinate: CoordinateT };

export type ActiveEffectT = {
	animationId: string;
	effectId: string;
};

export type ColorActions =
	| 'setColorAndTransition'
	| 'setColor'
	| 'setTransition'
	| 'clearColorAndTransition'
	| 'clearColor'
	| 'clearTransition'
	| 'pipette'
	| 'fill'
	| 'select'
	| 'copy'
	| 'cut'
	| 'paste';

export type FrameColorActionPayloadT = {
	frameId: string;
	coordinate: CoordinateT;
	colorAction?: ColorActions;
};

export type UpdateFramePayloadT<K extends keyof FrameStateT> = {
	frameId: string;
	key: K;
	value: FrameStateT[K];
};

export type UpdateEffectPayloadT<K extends keyof EffectStateT> = {
	animationId: string;
	id: string;
	key: K;
	value: EffectStateT[K];
};
