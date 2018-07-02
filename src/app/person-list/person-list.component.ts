import { Component, TrackByFunction } from '@angular/core';
import { PersonService } from '../service/person.service';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { Person } from '../model/person.model';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {

  public persons$: Observable<Person[]>;
  private _filter$ = new BehaviorSubject<string>(null);

  constructor(personService: PersonService) {
    this.persons$ = this._filter$.pipe(
      switchMap((filter: string) => personService.persons$().pipe(map(persons => persons.filter(it => this.accept(it, filter)))))
    );
  }

  public onFilter(filter: string): void {
    this._filter$.next(filter);
  }

  public trackByFn: TrackByFunction<Person> = (index: number, it: Person): any => {
    return it.id;
  };

  private accept(person: Person, filter: string): boolean {
    if (!filter || !filter.trim()) {
      return true;
    }
    return this.displayName(person).toLowerCase().includes(filter.toLowerCase());
  }

  public displayName(person: Person): string {
    return PersonService.displayName(person);
  }
}
