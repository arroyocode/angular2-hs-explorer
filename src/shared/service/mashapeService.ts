import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response, URLSearchParams} from 'angular2/http';
import {ApiHttp} from './apiHttp';

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
		var searchParams = new URLSearchParams();
		searchParams.set('locale', locale);
        return this._apiHttp.get('/cardbacks', searchParams)
			.map((res: Response) => res.json());
    }

	getCardSearch(name: string, collectible?: number, locale?: string) {
		// GET: /cards/search/{name}
	}

	getCardSet(set: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET: /cards/sets/{set}
	}

	getCardsByClass(heroClass: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET /cards/classes/{heroClass}
	}

	getCardsByFaction(faction: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET /cards/factions/{faction}
	}

	getCardsByQuality(quality: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET /cards/qualities/{quality}
	}

	getCardsByRace(race: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET /cards/races/{race}
	}

	getCardsByType(type: string, attack?: number, collectible?: number, cost?: number, durability?: number, health?: number, locale?: string) {
		// GET /cards/types/{type}
	}

	getSingleCard(name: string, collectible?: number, locale?: string) {
		// GET /cards/{name}
	}
}