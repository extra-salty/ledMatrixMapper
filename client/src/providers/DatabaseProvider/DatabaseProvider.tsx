import { useUser } from '../UserProvider/useUser';
import { createContext } from 'react';
import { AnimationBaseT } from '@/types/animation/animation.types';
import { AnimationCollection } from '@/libs/mongodb/collections/AnimationsService';

export type DocumentT = Realm.Services.MongoDB.Document;
export type CollectionT<T extends DocumentT> =
	Realm.Services.MongoDB.MongoDBCollection<T>;

export type DatabaseT = {
	animations: AnimationCollection;
};

export const DatabaseContext = createContext<DatabaseT | null>(null);

const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
	const user = useUser();

	const client = user.mongoClient(process.env.NEXT_PUBLIC_MONGO_CLUSTER_NAME);
	const db = client.db(process.env.NEXT_PUBLIC_MONGO_DB_NAME);

	const animations = db.collection<AnimationBaseT>(
		process.env.NEXT_PUBLIC_MONGO_ANIMATIONS_COLLECTION,
	);

	const AnimationsService = new AnimationCollection(user.id, animations);

	const value: DatabaseT = {
		animations: AnimationsService,
	};

	return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export default DatabaseProvider;
