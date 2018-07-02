import { Observable } from 'rxjs';
import { FormMode } from './form-mode';

export interface FormHandler {

  mode: FormMode;

  /**
   * Lifecycle hook that is called to load data.
   *
   * Everytime the {Observable} returned fires, the view is updated by invoking 'UxFormDataBinding.onModelToView'.
   */
  load$(): Observable<any>;

  /**
   * Lifecycle hook that is called to store data.
   *
   * This method is invoked after 'UxFormDataBinding.onViewToModel'.
   */
  store$(): Observable<any>;
}
