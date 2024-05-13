export type MethodConfigT = {
	endpoint: string;
	params?: Record<string, any>;
	body?: any;
	type?: ContentType;
	cache?: CacheOptions;
};

export type KeyValueT<T = any> = { [key: string]: T };

export enum HttpMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	HEAD = 'HEAD',
	DELETE = 'DELETE',
}

export enum CacheOptions {
	default = 'default',
	noStore = 'no-store',
	reload = 'reload',
	noCache = 'no-cache',
	forceCache = 'force-cache',
	onlyIfCached = 'only-if-cached',
}

export enum ContentType {
	JSON = 'application/json',
	FormData = 'multipart/form-data',
}

export interface HttpClientBaseHeader {
	'Content-Type': ContentType;
	Authorization?: string;
}
