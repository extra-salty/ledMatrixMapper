import { MongoService } from '@/libs/mongodb/MongoService';
import { CacheOptions, MethodConfigT } from '@/libs/http/HttpClient.types';
import { AnimationBaseT } from '@/types/animation/animation.types';

class AnimationsService extends MongoService {
	private endpoint: string = 'animations';

	getAnimations(): Promise<AnimationBaseT[]> {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			cache: CacheOptions.noStore,
		};
		return this.get<AnimationBaseT[]>(methodConfig);
	}

	deleteAnimations(ids: string[]) {
		const methodConfig: MethodConfigT = {
			endpoint: this.endpoint,
			params: { ids: encodeURIComponent(ids.join('&')) },
		};
		return this.delete(methodConfig);
	}
}

export const AnimationsServiceInstance = new AnimationsService();
