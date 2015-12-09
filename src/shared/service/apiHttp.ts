import {Injectable, Injector, Inject} from 'angular2/angular2';
import {Http, Request, RequestOptions, ResponseOptions, ConnectionBackend, XHRConnection, BrowserXhr} from 'angular2/http';

@Injectable()
export class ApiConnectionBackend extends ConnectionBackend {
	constructor(
		private _browserXhr: BrowserXhr,
		private _baseResponseOptions: ResponseOptions,
		@Inject('API_BASE_HREF') private _baseHref: string) {
		super();
	}

	createConnection(request: Request): XHRConnection {
		request.headers.set('X-Mashape-Key', 'o99raO3GdemshLKCf8XPNKPoubfCp1XAVJYjsnSNAW5S0YuHpf');
		request.url = this._baseHref + request.url;
		var connection = new XHRConnection(request, this._browserXhr, this._baseResponseOptions);
		return connection;
	}
}

@Injectable()
export class ApiHttp extends Http {
	constructor(
		protected _backend: ApiConnectionBackend,
		protected _defaultOptions: RequestOptions) {
		super(_backend, _defaultOptions);
	}
}