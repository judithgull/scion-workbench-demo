import { mergeMapTo, take } from 'rxjs/operators';
import { EMPTY, MonoTypeOperatorFunction } from 'rxjs';

/**
 * Emits only the first `value` emitted by the source Observable.
 * After that, it completes, regardless if the source completes.
 *
 * This operator is an alias for 'take(1)'.
 * Unlike 'first()', this operator does not throw an Error if the source Observable
 * completes before any `next` notification was sent.
 */
export function once<T>(): MonoTypeOperatorFunction<T> {
  return take(1);
}

/**
 * Immediately emits a complete notification without emitting any item.
 */
export function empty(): MonoTypeOperatorFunction<never> {
  return mergeMapTo(EMPTY);
}

