import { RootState } from '@/libs/redux/store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const usePlaylistOrder = () =>
	useSelector((state: RootState) => state.playlist.state.order);

export const usePlaylistData = () =>
	useSelector((state: RootState) => state.playlist.data);

export const usePlaylistDataExist = () =>
	useSelector((state: RootState) => !!state.playlist.data.length);

export const useAnimationNames = () => {
	const playlistData = useSelector((state: RootState) => state.playlist.data);

	return useMemo(
		() =>
			Object.fromEntries(Object.values(playlistData).map(({ _id, name }) => [_id, name])),
		[playlistData],
	);
};
