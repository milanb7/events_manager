import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EventModel} from '../model/events.model';
import {ConfigService} from '../services/events.service';
import * as EventsActions from './events.actions';
import * as EventsListActions from './events.actions';


@Injectable()
export class EventsEffects {

  @Effect()
  dataLoad = this.actions$
  .ofType(EventsActions.LOAD_DATA).pipe(
    switchMap( () => this.eventsService.httpRequest()),
    map(
      (data: EventModel[]) => new EventsListActions.InitEvents(data)
      ),
    catchError( (error: string) => of(new EventsListActions.LoadFailure(error)))
    );


  @Effect()
  dataSort = this.actions$
    .ofType(EventsActions.ADD_EVENT, EventsActions.INIT_EVENTS).pipe(
      map( () =>
        new EventsListActions.SortEvents()
    )
);

  constructor(private actions$: Actions, private eventsService: ConfigService) {}

}
