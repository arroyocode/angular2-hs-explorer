import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {CardBack} from './shared/cardBack';
import {MashapeService} from './shared/mashapeService';

@Component({
    selector: 'app',
    template: `
        <ul>
            <li *ng-for="#cardBack of cardBacks"><img src="{{cardBack.img}}" width="100" />{{ cardBack.name }} - {{ cardBack.description }}</li>
        </ul>
    `,
    directives: [CORE_DIRECTIVES]
})
export class AppComponent {
	cardBacks: CardBack[];
    constructor(service: MashapeService){
        service.getAllCardBacks()
            .subscribe(res => this.cardBacks = res);
    }
}
