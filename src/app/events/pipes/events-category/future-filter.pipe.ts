import { Pipe, PipeTransform } from '@angular/core';
import {EventModel} from '../../model/events.model';

@Pipe({
  name: 'futureFilter'
})
export class FutureFilterPipe implements PipeTransform {

  transform(events: EventModel[], actualClock: number): any {

    if (!events) {return []; }
    if (!actualClock) {return []; }

    return events.filter(
      function(event) {
        const eventDateStart: number = Date.parse(event.startDate);

        if (eventDateStart > actualClock) {
          return true;
        }
        else {
          return false;
        }
      }
    );

  }

}
