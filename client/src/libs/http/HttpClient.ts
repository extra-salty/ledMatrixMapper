import {
	CacheOptions,
	ContentType,
	HttpMethods,
	MethodConfigT,
} from './HttpClient.types';

export class HttpClient {
	private baseUrl: string;
	private config: Record<string, any>;

	constructor(baseUrl: string, config: Record<string, any>) {
		this.baseUrl = baseUrl;
		this.config = config;
	}

	get<ResponseType>(methodConfig: Omit<MethodConfigT, 'data'>) {
		return this.request<ResponseType>(HttpMethods.GET, methodConfig);
	}

	post<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.POST, methodConfig);
	}

	put<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.PUT, methodConfig);
	}

	patch<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.PATCH, methodConfig);
	}

	head<ResponseType>(methodConfig: Omit<MethodConfigT, 'data'>) {
		return this.request<ResponseType>(HttpMethods.HEAD, methodConfig);
	}

	delete<ResponseType>(methodConfig: MethodConfigT) {
		return this.request<ResponseType>(HttpMethods.DELETE, methodConfig);
	}

	private async request<ResponseType>(
		method: HttpMethods,
		{ endpoint, body, type, params, cache }: MethodConfigT,
	): Promise<ResponseType> {
		const urlParams = params ? `?${new URLSearchParams(params)}` : '';
		const url = `${this.baseUrl}/${endpoint}${urlParams}`;
		let result = null;

		try {
			const response = await fetch(url, {
				...this.config,
				method: method,
				// headers: {
				// 	'Content-Type': type || ContentType.JSON,
				// },
				cache: cache || CacheOptions.default,
				body: type === ContentType.JSON ? JSON.stringify(body) : body,
			});

			if (response.ok) {
				const contentType = response.headers.get('content-type');

				if (contentType && contentType.indexOf('application/json') !== -1) {
					result = await response.json();
				}
			}
		} catch (e) {
			console.error(e);
		}

		return result;
	}
}
