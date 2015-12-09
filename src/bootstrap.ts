import {bootstrap, provide} from 'angular2/angular2';
import {appProviders} from './app.providers';
import {AppComponent} from './app.component';

bootstrap(AppComponent, appProviders());