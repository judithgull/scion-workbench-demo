import { Directive, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PROPOSAL_PROVIDER, ProposalKey } from '../widget/proposal-field/proposal-field.constants';
import { ProposalProvider } from '../widget/proposal-field/proposal-provider';
import { PersonService } from '../service/person.service';
import { Person } from '../model/person.model';

/**
 * Provides person proposals for {ProposalField}.
 */
@Directive({
  selector: 'input[appProposalField][appPersonProposalProvider]',
  providers: [
    {provide: PROPOSAL_PROVIDER, useClass: forwardRef(() => PersonProposalProviderDirective)},
  ]
})
export class PersonProposalProviderDirective implements ProposalProvider {

  constructor(private _personService: PersonService) {
  }

  public displayText$(proposal: ProposalKey): Observable<string> | string {
    return this._personService.person$(Number(proposal))
      .pipe(map((person: Person | null): string => {
        return PersonService.displayName(person);
      }));
  }

  public proposals$(filter$: Observable<string>): Observable<ProposalKey[]> {
    return filter$.pipe(switchMap(filterText => this._personService.filter$(filterText)));
  }
}
