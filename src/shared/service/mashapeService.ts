import {Injectable} from 'angular2/core';
import {Http, Headers, Response, URLSearchParams} from 'angular2/http';
import {ApiHttp} from './apiHttp';

export interface IApiConfig {
	name?: string,
	set?: string,
	heroClass?: string,
	faction?: string,
	quality?: string,
	race?: string,
	type?: string,
	attack?: number,
	collectible?: number,
	cost?: number,
	durability?: number,
	health?: number,
	locale?: string
}

@Injectable()
export class MashapeService {
    constructor(private _apiHttp: ApiHttp) {
    }

	getAllCards(config: IApiConfig) {
		return this._apiHttp.get('/cards', buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardBacks(config: IApiConfig) {
        return this._apiHttp.get('/cardbacks', buildApiQueryParams(config))
			.map((res: Response) => res.json());
    }

	getCardSearch(config: IApiConfig) {
		return this._apiHttp.get('/cards/search/' + encodeURI(config.name), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardSet(config: IApiConfig) {
		return this._apiHttp.get('/cards/sets/' + encodeURI(config.set), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByClass(config: IApiConfig) {
		return this._apiHttp.get('/cards/classes/' + encodeURI(config.heroClass), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByFaction(config: IApiConfig) {
		return this._apiHttp.get('/cards/factions/' + encodeURI(config.faction), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByQuality(config: IApiConfig) {
		return this._apiHttp.get('/cards/qualities/' + encodeURI(config.quality), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByRace(config: IApiConfig) {
		return this._apiHttp.get('/cards/races/' + encodeURI(config.race), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByType(config: IApiConfig) {
		return this._apiHttp.get('/cards/types/' + encodeURI(config.type), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getSingleCard(config: IApiConfig) {
		return this._apiHttp.get('/cards/' + encodeURI(config.name), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}
}

function buildApiQueryParams(config: IApiConfig) {
	var params = new URLSearchParams();
	for (var key in config) {
		if (config[key]) {
			params.set(this[key], config[key]);
		}
    }
	return params;
}
