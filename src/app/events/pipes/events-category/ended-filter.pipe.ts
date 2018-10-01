import { Pipe, PipeTransform } from '@angular/core';
import {EventModel} from '../../model/events.model';

@Pipe({
  name: 'endedFilter'
})
export class EndedFilterPipe implements PipeTransform {

  transform(events: EventModel[], actualClock: number): any {

    if (!events) {return []; }
    if (!actualClock) {return []; }

    return events.filter(
      function(event) {
        const eventDateEnd: number = Date.parse(event.endDate);

        if (eventDateEnd < actualClock) {
          return true;
        }
        else {
          return false;
        }
      }
    );

  }

}

