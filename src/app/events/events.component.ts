import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import * as fromApp from '../store/app.reducers';
import {EventModel} from './../events/model/events.model';
import * as EventsListActions from './../events/store/events.actions';
import * as fromListActions from './../events/store/events.reducers';
import {getEventListState} from './store';

@Component({
  selector: 'app-events',
  styleUrls: ['./events.component.css'],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, OnDestroy  {

  /*Filters*/
  private title: string = '';
  private description: string = '' ;
  private location: string = '';
  private owner: string = '';

  /*Store*/
  private eventsListState$: Observable<fromListActions.State>;

  /*Actual date*/
  private actClock: number = Date.now();
  private actClockObsSubscription: Subscription;

  /*Event detail*/
  private eventsSubject: Subject<EventModel> = new Subject<EventModel>();


  constructor(private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    const source = interval(1000);
    this.actClockObsSubscription = source.subscribe( ( ) => {this.actClock = Date.now(); }  );

    this.eventsListState$ = this.store.select(getEventListState);
    this.store.dispatch(new EventsListActions.LoadData());

  }


  showEvtdetail(event: EventModel) {
    this.eventsSubject.next(event);
  }


  onAddEvent(form: NgForm) {

    const descriptionArray: string[] = ['Perfect people', 'Perfect music', 'Nice place',
      'Plus drink tasting', 'lets go'];
    const datefromArray: string[] = ['2017-09-01T21:53:50.543Z', '2019-03-01T20:00:00.543Z',
      '2017-09-01T09:00:00.543Z'];
    const dateToArray: string[] =   ['2017-09-01T22:53:50.543Z', '2019-03-01T20:30:50.543Z',
      '2018-09-30T12:00:00.543Z'];
    const placeArray: string[] = ['SK, Oravska 55, Nitra', 'SK, Amfiteater Presov', 'Austria, Wien theater',
      'CZ, Praha square', 'D, Munchen football stadium'];
    const daterandomIdex: number = Math.floor(Math.random() * datefromArray.length);
    const ownerGenerator: boolean = Math.random() < 0.5;

    let newtitle: string = form.value.newEvtTitle;
    newtitle = newtitle.charAt(0).toUpperCase() + newtitle.slice(1);
    const newAddEvent: EventModel = {
      description: descriptionArray[Math.floor(Math.random() * descriptionArray.length)],
      endDate: dateToArray[daterandomIdex],
      id: null,
      location: placeArray[Math.floor(Math.random() * placeArray.length)],
      owner: ownerGenerator,
      startDate: datefromArray[daterandomIdex],
      title: newtitle
    };
    this.store.dispatch(new EventsListActions.AddEvent(newAddEvent));

    form.reset();
  }


  clearFilters() {
    this.title = this.description = this.location = this.owner = null;
  }

  ngOnDestroy() {
    this.actClockObsSubscription.unsubscribe();
  }

}
