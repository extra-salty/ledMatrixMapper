import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';

export const usePlaylistOrder = () =>
	useSelector((state: RootState) => state.playlist.state.order);

export const usePlaylistInternalState = () =>
	useSelector((state: RootState) => state.playlist.state.internal);

export const usePlaylistRowSelection = () =>
	useSelector((state: RootState) => state.playlist.state.internal.rowSelection);

export const usePlaylistFocusedRow = () =>
	useSelector((state: RootState) => state.playlist.state.focusedRow);
