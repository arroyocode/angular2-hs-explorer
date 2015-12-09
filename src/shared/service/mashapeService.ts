import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response, URLSearchParams} from 'angular2/http';
import {ApiHttp} from './apiHttp';
import {CardBack} from '../model/cardBack';

@Injectable()
export class MashapeService {
    constructor (private _apiHttp: ApiHttp){
    }

	getAllCards() {
		// GET: /cards
		//		attack: string
		//		collectible: number
		//		cost: number
		//		durability: number
		// 		health: number
		//		locale: string
	}

	getCardBacks(locale?: string) {
		// GET:	/cardbacks

		var searchParams = new URLSearchParams();
		searchParams.set('locale', locale);
        return this._apiHttp.get('/cardbacks', searchParams)
            .map((res: Response) => res.json())
            .map((cardBacks: Array<any>) => {
                let result:Array<CardBack> = [];
                if (cardBacks) {
                    cardBacks.forEach((cardBack) => {
                        result.push(
                            new CardBack(
                                cardBack.cardBackId,
                                cardBack.name,
                                cardBack.description,
                                cardBack.source,
                                cardBack.sourceDescription,
                                cardBack.enabled,
                                cardBack.img,
                                cardBack.imgAnimated,
                                cardBack.sortCategory,
                                cardBack.sortOrder,
                                cardBack.locale
                            ));
                    });
                }
                return result;
            });
    }

	getCardSearch(name: string, collectible?: number, local?: string) {
		// GET: /cards/search/{name}
	}
}