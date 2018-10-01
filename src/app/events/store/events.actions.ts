import {Action} from '@ngrx/store';
import {EventModel} from '../model/events.model';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const INIT_EVENTS = 'INIT_EVENTS';
export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_FAILURE = 'LOAD_FAILURE';
export const SORT_EVENTS = 'SORT_EVENTS';

export class LoadData implements Action {
  readonly type = LOAD_DATA;
}

export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: string) {}
}

export class AddEvent implements Action {
  readonly type = ADD_EVENT;
  constructor(public payload: EventModel) {}
}

export class DeleteEvent implements Action {
  readonly type = DELETE_EVENT;
  constructor(public payload: number) {}
}

export class InitEvents implements Action {
  readonly type = INIT_EVENTS;
  constructor(public payload: EventModel[]) {}
}

export class SortEvents implements Action {
  readonly type = SORT_EVENTS;
}

export type EventsListActions = AddEvent  | DeleteEvent | InitEvents  | LoadData |
  LoadFailure | SortEvents;
