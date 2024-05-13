import 'server-only';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
const options = {};

let client;
let mongoClientPromise: Promise<MongoClient>;

if ((process.env.NODE_ENV || '') === 'development') {
	let globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
	}
	mongoClientPromise = globalWithMongo._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	mongoClientPromise = client.connect();
}

export default mongoClientPromise;

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
// In production mode, it's best to not use a global variable.

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
