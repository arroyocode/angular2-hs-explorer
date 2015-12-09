import {bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {MashapeService} from './shared/mashapeService';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS, provide(MashapeService, { useClass: MashapeService })]);