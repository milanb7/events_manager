import { Pipe, PipeTransform } from '@angular/core';
import {EventModel} from '../../model/events.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(events: EventModel[], title: string, description: string, location: string, owner: string ): any {

    if (!events) {return []; }

    return events.filter(
      function(event) {
        if ( ((!description) || (event.description.toLowerCase().includes(description.toLowerCase()))) &&
            ((!title) || (event.title.toLowerCase().includes(title.toLowerCase()))) &&
            ((!location) || (event.location.toLowerCase().includes(location.toLowerCase()))) &&
            ((!owner) || (owner === 'My' && event.owner === true) || (owner === 'Others' && event.owner === false))
          ) {
            return true;
          }
        return false;
      }
    );
  }

}

