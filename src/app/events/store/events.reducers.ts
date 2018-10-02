import * as _ from 'lodash';
import {EventModel} from '../model/events.model';
import * as EventsListActions from './events.actions';


export interface State {
  events: Array<EventModel>;
  isLoading: boolean;
  loadFailure: string;
}

const initialState: State = {
  events : [],
  isLoading: true,
  loadFailure: null
};

function getMaxEvtId(events: EventModel[]): number {
  return Math.max(0, ...events.map(({id}) => id));
}

export function eventsListReducer(state = initialState, action: EventsListActions.EventsListActions): State {

  switch (action.type) {
    case EventsListActions.LOAD_FAILURE:
      return{
        ...state,
        isLoading: false,
        loadFailure: action.payload
      };
    case EventsListActions.ADD_EVENT:
      const maxNumberAddEvt =  getMaxEvtId(state.events);
      const newEvent = {...action.payload, id: maxNumberAddEvt + 1};
      return{
        ...state,
        events: [...state.events, newEvent]
      };
    case EventsListActions.DELETE_EVENT:
      const filteredEvents = state.events.filter((event) => event.id !== action.payload);
      return{
        ...state,
        events: filteredEvents
      };
    case EventsListActions.INIT_EVENTS:
      return{
        ...state,
        events: [...state.events, ...action.payload],
        isLoading: false
      };
    case EventsListActions.SORT_EVENTS:
      let sortedEvts = state.events.slice();
      sortedEvts =  _.sortBy(sortedEvts, (evt) => Date.parse(evt.startDate));
      return{
        ...state,
        events: sortedEvts
      };
    default:
      return state;
  }

}

export const getEvents = (state: State) => state.events;
export const getIsLoading = (state: State) => state.isLoading;
export const getLoadFailure = (state: State) => state.loadFailure;
