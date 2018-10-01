import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Rx';
import {EventModel} from '../model/events.model';
import * as EventsListActions from '../store/events.actions';
import * as fromListActions from './../../events/store/events.reducers';


export function jsonISOTimeValidator(control: FormControl) {

  if (!!(Date.parse(control.value))) {
    return null;
  }

  return {
    jsonTimeValidator: {
      valid: false
    }
  };

}

@Component({
  selector: 'app-event-detail',
  styleUrls: ['./event-detail.component.css'],
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit, OnDestroy {

  @Input() events: Observable<EventModel>;
  eventsSubscription: Subscription;
  eventDetail: EventModel = null;

  eventDetialForm: FormGroup;

  constructor(private store: Store<fromListActions.AppState>) {}

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe((event) => {
      this.eventDetail = _.cloneDeep(event);
      this.initForm();
    });
  }


  initForm() {
    let eventTitle = '';
    let eventLocation = '';
    let eventDescription = '';
    let eventStartTimeFull = '';
    let eventStartTime = '';
    let eventLocalStartTime = '';
    let eventEndTimeFull = '';
    let eventEndTime = '';
    let eventLocalEndTime = '';
    let eventOwner = '';

    if (this.eventDetail) {
      eventTitle = this.eventDetail.title;
      eventLocation = this.eventDetail.location;
      eventDescription = this.eventDetail.description;
      eventOwner = (this.eventDetail.owner) ? eventOwner = 'My' : eventOwner = 'Other';

      eventStartTimeFull = new Date(this.eventDetail.startDate).toUTCString();
      eventEndTimeFull = new Date(this.eventDetail.endDate).toUTCString();

      eventStartTime = this.eventDetail.startDate;
      eventEndTime = this.eventDetail.endDate;

      eventLocalStartTime = (new Date(this.eventDetail.startDate)).toLocaleString('en-US');
      eventLocalEndTime = (new Date(this.eventDetail.endDate)).toLocaleString('en-US');
    }

    this.eventDetialForm = new FormGroup(
      {
        description: new FormControl(eventDescription),
        endTime: new FormControl(eventEndTime, [jsonISOTimeValidator]),
        endTimeFull: new FormControl(eventEndTimeFull),
        id: new FormControl(this.eventDetail.id),
        localEndTime: new FormControl(eventLocalEndTime),
        localStartTime: new FormControl(eventLocalStartTime),
        location: new FormControl(eventLocation),
        owners: new FormControl(eventOwner),
        startTime: new FormControl(eventStartTime, [jsonISOTimeValidator]),
        startTimeFull: new FormControl(eventStartTimeFull),
        title : new FormControl(eventTitle, Validators.required)
      }
    );
  }


  updateEvent() {

    const eventFormData: EventModel = {
      description: this.eventDetialForm.value.description,
      endDate: this.eventDetialForm.value.endTime,
      id: this.eventDetialForm.value.id,
      location: this.eventDetialForm.value.location,
      owner: this.eventDetialForm.value.owners === 'My',
      startDate: this.eventDetialForm.value.startTime,
      title: this.eventDetialForm.value.title
    };

    this.store.dispatch(new EventsListActions.DeleteEvent(this.eventDetialForm.value.id));
    this.store.dispatch(new EventsListActions.AddEvent(eventFormData));
    this.CloseDetail();

  }

  onDuplicateEvent(event: EventModel ) {
    this.store.dispatch(new EventsListActions.AddEvent(event));
    this.CloseDetail();
  }


  onDeleteEvent(indexEvent: number) {
    this.store.dispatch(new EventsListActions.DeleteEvent(indexEvent));
    this.CloseDetail();
  }

  CloseDetail() {
    this.eventDetail = null;
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

}

