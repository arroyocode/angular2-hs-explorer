import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response, URLSearchParams} from 'angular2/http';
import {ApiHttp} from './apiHttp';

interface IApi {
	name: string,
	set: string,
	heroClass: string,
	faction: string,
	quality: string,
	race: string,
	type: string,
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
		var searchParams = new URLSearchParams();
		searchParams.set('attack', attack.toString());
		searchParams.set('collectible', collectible.toString());
		searchParams.set('cost', cost.toString());
		searchParams.set('durability', durability.toString());
		searchParams.set('health', health.toString());
		searchParams.set('locale', locale);
		return this._apiHttp.get('/cards', searchParams)
			.map((res: Response) => res.json());
	}

	getCardBacks(locale?: string) {
		var params = new URLSearchParams();
		params.set('locale', locale);
        return this._apiHttp.get('/cardbacks', params)
			.map((res: Response) => res.json());
    }

	getCardSearch(name: string, collectible?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('collectible', collectible.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/search/' + encodeURI(name), params)
			.map((res: Response) => res.json());
	}

	getCardSet(set: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/sets/' + encodeURI(set), params)
			.map((res: Response) => res.json());
	}

	getCardsByClass(heroClass: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/classes/' + encodeURI(heroClass), params)
			.map((res: Response) => res.json());
	}

	getCardsByFaction(faction: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/factions/' + encodeURI(faction), params)
			.map((res: Response) => res.json());
	}

	getCardsByQuality(quality: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/qualities/' + encodeURI(quality), params)
			.map((res: Response) => res.json());
	}

	getCardsByRace(race: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/races/' + encodeURI(race), params)
			.map((res: Response) => res.json());
	}

	getCardsByType(type: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('attack', attack.toString());
		params.set('collectible', collectible.toString());
		params.set('cost', cost.toString());
		params.set('durability', durability.toString());
		params.set('health', health.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/types/' + encodeURI(type), params)
			.map((res: Response) => res.json());
	}

	getSingleCard(name: string, collectible?: number, locale?: string) {
		var params = new URLSearchParams();
		params.set('collectible', collectible.toString());
		params.set('locale', locale);
		return this._apiHttp.get('/cards/' + encodeURI(name), params)
			.map((res: Response) => res.json());
	}
}