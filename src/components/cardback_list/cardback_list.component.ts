import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {HTTP_PROVIDERS} from 'angular2/http';
import {IApiConfig, MashapeService} from '../../shared/service/mashapeService';

@Component({
    selector: 'cardback_list',
	providers: [MashapeService],
	directives: [CORE_DIRECTIVES],
    templateUrl: 'cardback_list.component.html',
	styleUrls: ['cardback_list.component.css'],
	moduleId: module.id
})
export class CardBackListComponent {
	cardBacks: any;
    constructor(service: MashapeService) {
		var config = <IApiConfig>{
			locale: 'en-us'
		};
        service.getCardBacks(config)
            .subscribe(res => this.cardBacks = res);
    }
}