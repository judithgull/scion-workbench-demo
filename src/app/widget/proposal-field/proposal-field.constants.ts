import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ProposalProvider } from './proposal-provider';

/**
 * Represents the key of a proposal (string).
 */
export declare type ProposalKey = string | number;

/**
 * DI injection token to register proposal provider for {ProposalFieldDirective}.
 */
export const PROPOSAL_PROVIDER = new InjectionToken<ProposalProvider>('PROPOSAL_PROVIDER');
/**
 * Internal DI injection token to observe filter field of {ProposalFieldDirective}.
 */
export const PROPOSAL_FILTER = new InjectionToken<Observable<string>>('PROPOSAL_FILTER');
/**
 * Internal DI injection token to provide the selected proposal to {ProposalFieldPopupComponent}.
 */
export const PROPOSAL_SELECTION = new InjectionToken<ProposalKey | null>('PROPOSAL_SELECTION');
