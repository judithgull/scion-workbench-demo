import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/index';
import { PersonService } from '../service/person.service';
import { Person } from '../model/person.model';

/**
 * Resolves a person by id. This pipe works asynchronously and returns an {Observable}.
 *
 * Usage:
 *
 * <ul>
 *   <li *ngFor="let person of personIds | appResolvePerson$ | async;">...</li>
 * </ul>
 */
@Pipe({
  name: 'appResolvePerson$',
  pure: true
})
export class PersonResolvePipe implements PipeTransform {

  constructor(private _personService: PersonService) {
  }

  public transform(id: number | number[]): Observable<Person | Person[]> {
    if (Array.isArray(id)) {
      return this._personService.persons$(id);
    } else {
      return this._personService.person$(id);
    }
  }
}
