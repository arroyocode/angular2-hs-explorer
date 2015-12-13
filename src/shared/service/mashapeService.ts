import {Injectable} from 'angular2/angular2';
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

	getAllCards(attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config:IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards', buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardBacks(locale?: string) {
		var config: IApiConfig = { locale: locale }
        return this._apiHttp.get('/cardbacks', buildApiQueryParams(config))
			.map((res: Response) => res.json());
    }

	getCardSearch(name: string, collectible?: number, locale?: string) {
		var config: IApiConfig = { collectible: collectible, locale: locale }
		return this._apiHttp.get('/cards/search/' + encodeURI(name), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardSet(set: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/sets/' + encodeURI(set), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByClass(heroClass: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/classes/' + encodeURI(heroClass), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByFaction(faction: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/factions/' + encodeURI(faction), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByQuality(quality: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/qualities/' + encodeURI(quality), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByRace(race: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/races/' + encodeURI(race), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getCardsByType(type: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var config: IApiConfig = { attack: attack, collectible: collectible, cost: cost, durability: durability, health: health, locale: locale }
		return this._apiHttp.get('/cards/types/' + encodeURI(type), buildApiQueryParams(config))
			.map((res: Response) => res.json());
	}

	getSingleCard(name: string, collectible?: number, locale?: string) {
		var config: IApiConfig = { collectible: collectible, locale: locale }
		return this._apiHttp.get('/cards/' + encodeURI(name), buildApiQueryParams(config))
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
