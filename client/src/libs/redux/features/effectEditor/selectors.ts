import { RootState } from '@/libs/redux/store';
import {
	EffectPlayerOptionsT,
	FrameGridOptionsT,
} from '@/types/effectEditor/effectEditor.types';
import { useSelector } from 'react-redux';

// Frame Grid Options
export const useFrameGridWidth = () =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.gridWidth);

export const useFrameGridOptionsToggles = () =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.toggle);

export const useFrameGridOptionsToggle = (key: keyof FrameGridOptionsT['toggle']) =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.toggle[key]);

export const useFrameGridOptionsSelects = () =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.select);

export const useFrameGridOptionsSelect = (key: keyof FrameGridOptionsT['select']) =>
	useSelector((state: RootState) => state.effectEditor.gridOptions.select[key]);

export const useMaxNumberOfColumns = () =>
	useSelector((state: RootState) => {
		const numberOfColumns = state.effectEditor.gridOptions.select.numberOfColumns;
		const gridWidth = state.effectEditor.gridOptions.gridWidth;
		const maxColumns = Math.round((gridWidth - (numberOfColumns - 1) * 16) / 250);
		const limitedColumns = Math.min(numberOfColumns, maxColumns);

		return { maxColumns, limitedColumns };
	});

export const useFrameCellSize = () =>
	useSelector((state: RootState) => {
		const { width: matrixWidth } = state.effects.data.options.activeMatrixSize!;
		const {
			select: { numberOfColumns },
			gridWidth,
		} = state.effectEditor.gridOptions;

		const gapsWidth = (numberOfColumns - 1) * 16;
		const cellSize = (gridWidth - gapsWidth) / (numberOfColumns * matrixWidth);

		return cellSize;
	});

// Effect Player Options

export const useEffectPlayerToggles = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.toggle);

export const useEffectPlayerToggle = (key: keyof EffectPlayerOptionsT['toggle']) =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.toggle[key]);

export const useEffectPlayerSelects = () =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.select);

export const useEffectPlayerSelect = (key: keyof EffectPlayerOptionsT['select']) =>
	useSelector((state: RootState) => state.effectEditor.playerOptions.select[key]);
