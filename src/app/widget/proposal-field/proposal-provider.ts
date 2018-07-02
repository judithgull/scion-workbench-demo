import { ProposalKey } from './proposal-field.constants';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

/**
 * Provides Proposals for a {ProposalField}.
 *
 * `ProposalField` extends Material input field with proposal functionality.
 * Proposals are provided in the form of a `ProposalProvider`, which typically is registered
 * as a service provider in its respecitve domain-specific directive. That directive must also be
 * installed on that input element.
 *
 * Example usage:
 *
 * <mat-form-field appearance="outline" floatLabel="always">
 *   <mat-label>Ort</mat-label>
 *   <input matInput appProposalField appPlaceProposalProvider formControlName="ort">
 *   <mat-icon matSuffix>place</mat-icon>
 * </mat-form-field>
 *
 * ----
 *
 * @Directive({
 *   selector: 'input[appProposalField][appPlaceProposalProvider]',
 *   providers: [
 *     {provide: PROPOSAL_PROVIDER, useClass: forwardRef(() => PlaceProposalProviderDirective)},
 *   ]
 * })
 * export class PlaceProposalProviderDirective implements ProposalProvider {
 *   ...
 * }
 */
export interface ProposalProvider {

  /**
   * Returns the filter text for a proposal in the input field.
   */
  displayText$(proposal: ProposalKey): Observable<string> | string;

  /**
   * Returns the text for a proposal in the proposal popup.
   *
   * If not specifid, `displayText$` is used.
   */
  proposalText$?(proposal: ProposalKey): Observable<SafeHtml> | SafeHtml;

  /**
   * Returns proposals for a filter text.
   */
  proposals$(filter$: Observable<string>): Observable<ProposalKey[]>;
}
