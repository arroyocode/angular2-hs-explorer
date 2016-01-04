import {Component} from 'angular2/core';
import {CardBackListComponent} from './components/cardback_list/cardback_list.component';
import 'rxjs/operator/map';

@Component({
    selector: 'app',
	directives: [CardBackListComponent],
	template: `
		<cardback_list>
	`,
	styleUrls: ['app.component.css'],
  	moduleId: module.id
})
export class AppComponent {
}
