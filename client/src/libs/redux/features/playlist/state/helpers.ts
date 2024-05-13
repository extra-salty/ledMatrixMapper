import { PlaylistStateT } from '@/types/playlist/playlistTable.types';

export type Payload<K extends keyof PlaylistStateT> = {
	key: K;
	value: PlaylistStateT[K];
};

// : PayloadAction<Payload<K>>

// createAction function can`t handle generic, but payload won`t be specific either way

const myActionName = 'updateState';
export function updateState<K extends keyof PlaylistStateT>(
	key: K,
	value: PlaylistStateT[K],
) {
	return {
		type: myActionName,
		payload: { key, value },
	};
}
updateState.type = myActionName;
