import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { AppComponent } from './app.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventsComponent } from './events/events.component';
import { EndedFilterPipe } from './events/pipes/events-category/ended-filter.pipe';
import { FutureFilterPipe } from './events/pipes/events-category/future-filter.pipe';
import { RunningFilterPipe } from './events/pipes/events-category/running-filter.pipe';
import { SearchFilterPipe } from './events/pipes/search/search-filter.pipe';
import {ConfigService} from './events/services/events.service';
import {EventsEffects} from './events/store/events.effects';
import {reducers} from './store/app.reducers';


const appRoutes: Routes = [
{ path: '', component: EventsComponent }
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    EndedFilterPipe,
    FutureFilterPipe,
    RunningFilterPipe,
    SearchFilterPipe,
    EventsComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EventsEffects]),
    RouterModule.forRoot(appRoutes),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule
  ],
  providers: [ConfigService]


})
export class AppModule { }
