import {Component} from 'angular2/core';
import 'rxjs/operator/map';
import {CardBackListComponent} from './components/cardback_list/cardback_list.component';

@Component({
    selector: 'app',
	directives: [CardBackListComponent],
	template: `
		<cardback_list>
	`
})
export class AppComponent {
}
