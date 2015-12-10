import {Component} from 'angular2/angular2';
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
