import {Component, View, bootstrap} from 'angular2/angular2';
import {MashapeService} from './api/mashapeService';

@Component({
    selector: 'app'
})
@View({
    template: "<span>Hearthstone Explorer</span>"
})

class AppComponent { }
bootstrap(AppComponent, [MashapeService]);