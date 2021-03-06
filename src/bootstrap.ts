import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {appProviders} from './app.providers';
import {AppComponent} from './app.component';

enableProdMode();
bootstrap(AppComponent, appProviders());