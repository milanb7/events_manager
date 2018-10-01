import { Pipe, PipeTransform } from '@angular/core';
import {EventModel} from '../../model/events.model';

@Pipe({
  name: 'runningFilter'
})
export class RunningFilterPipe implements PipeTransform {

  transform(events: EventModel[], actualClock: number): any {

    if (!events) {return []; }
    if (!actualClock) {return []; }

    return events.filter(
      function(event) {
        const eventDateStart: number = Date.parse(event.startDate);
        const eventDateEnd: number = Date.parse(event.endDate);

        if (eventDateStart <= actualClock && eventDateEnd >= actualClock) {
          return true;
        }
        else {
          return false;
        }
      }
    );

  }

}
