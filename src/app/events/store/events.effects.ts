import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {EventModel} from '../model/events.model';
import {ConfigService} from '../services/events.service';
import * as EventsActions from './events.actions';
import * as EventsListActions from './events.actions';


@Injectable()
export class EventsEffects {

  @Effect()
  dataLoad = this.actions$
  .ofType(EventsActions.LOAD_DATA)
  .switchMap(() =>
    this.eventsService.getConfig()
      .mergeMap((data: EventModel[]) => [
        {
          payload: data,
          type: EventsActions.INIT_EVENTS
        }
      ])
      .catch( (error: string) => Observable.of(new EventsListActions.LoadFailure(error))));

  @Effect()
  dataSort = this.actions$
    .ofType(EventsActions.ADD_EVENT, EventsActions.INIT_EVENTS)
    .switchMap(() => [
      {
        type: EventsActions.SORT_EVENTS
      }
    ]);

  constructor(private actions$: Actions, private eventsService: ConfigService) {}

}
