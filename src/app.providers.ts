import {Provider, Type} from 'angular2/core';
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, Headers} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {API_PROVIDERS} from './shared/service/apiProviders';

export function appProviders() {
	return [
		HTTP_PROVIDERS,
		ROUTER_PROVIDERS,
		FORM_PROVIDERS,
		API_PROVIDERS
	]
}