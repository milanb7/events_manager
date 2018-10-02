import {createSelector} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import * as fromEventListState from './events.reducers';


export const getEventListState = (state: AppState) => state.eventsList;

export const getEvents = createSelector(getEventListState, fromEventListState.getEvents);
export const getIsLoading = createSelector(getEventListState, fromEventListState.getIsLoading);
export const getLoadFailure = createSelector(getEventListState, fromEventListState.getLoadFailure);
