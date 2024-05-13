import { RootState } from '@/libs/redux/store';
import { useSelector } from 'react-redux';

export const usePlaylistOrder = () =>
	useSelector((state: RootState) => state.playlist.state.order);

export const usePlaylistData = () =>
	useSelector((state: RootState) => state.playlist.data);

export const usePlaylistDataExist = () =>
	useSelector((state: RootState) => !!state.playlist.data.length);

export const getAnimationName = (_id: string) =>
	useSelector((state: RootState) => state.playlist.data[_id].name);
