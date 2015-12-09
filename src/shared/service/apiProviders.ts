import {Provider} from 'angular2/angular2';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {ApiHttp, ApiConnectionBackend} from './apiHttp';

export const API_PROVIDERS: any[] = [
	new Provider('API_BASE_HREF', { useValue: 'https://omgvamp-hearthstone-v1.p.mashape.com' }),
	new Provider(ApiHttp, { useClass: ApiHttp }),
	new Provider(ApiConnectionBackend, { useClass: ApiConnectionBackend })
];