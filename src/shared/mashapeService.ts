import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {CardBack} from './cardBack';

@Injectable()
export class MashapeService {
    constructor (private http: Http){
    }
    getAllCardBacks() {
		var headers = new Headers();
		headers.append('X-Mashape-Key', 'o99raO3GdemshLKCf8XPNKPoubfCp1XAVJYjsnSNAW5S0YuHpf');

        return this.http.get('https://omgvamp-hearthstone-v1.p.mashape.com/cardbacks', { headers: headers })
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
}