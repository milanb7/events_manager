import {ActionReducerMap} from '@ngrx/store';
import * as fromEventList from '../events/store/events.reducers';


export interface AppState {
  eventsList: fromEventList.State;
}

export const reducers: ActionReducerMap<AppState> =   {
  eventsList: fromEventList.eventsListReducer
} ;
