import { HttpClient } from '../http/HttpClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;
const config: Record<string, any> = {};

export class MongoService extends HttpClient {
	static baseUrl: string = process.env.NEXT_PUBLIC_BASE_API_URL;
	static config: Record<string, any> = {};

	constructor() {
		super(baseUrl, config);
	}
}
