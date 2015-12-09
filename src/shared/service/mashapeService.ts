import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {ApiHttp} from './apiHttp';
import {CardBack} from '../model/cardBack';

@Injectable()
export class MashapeService {
    constructor (private _apiHttp: ApiHttp){
    }

	getAllCards() {

	}

	getSingleCard() {

	}

    getAllCardBacks() {
        return this._apiHttp.get('/cardbacks')
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

	getCardSearch() {

	}

	getCardSet() {

	}

	getCardsByClass() {

	}
}