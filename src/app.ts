import {Component, CORE_DIRECTIVES, bootstrap} from 'angular2/angular2';
import {CardBack} from './shared/cardBack';
import {MashapeService} from './shared/mashapeService';

@Component({
    selector: 'app',
    template: `
        <ul>
            <li *ng-for="#cardBack of cardBacks">{{ cardBack.name }} - {{ cardBack.description }}</li>
        </ul>
    `,
    directives: [CORE_DIRECTIVES]
})

export class AppComponent {
	cardBacks: Array<CardBack>;
    constructor(service: MashapeService){
        service.getAllCardBacks()
            .subscribe(res => this.cardBacks = res);
    }
}

bootstrap(AppComponent);