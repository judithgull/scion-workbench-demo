export interface FormDataBinding {

  /**
   * Lifecycle hook that is called to write model data to view controls like {FormControl}.
   * This method is invoked after the {Observable} of {UxFormHandler.store$} fires.
   */
  onModelToView(): void;

  /**
   * Lifecycle hook that is called to write view data back to the model,
   * and is invoked before {UxFormHandler.store$} is called.
   */
  onViewToModel(): void;
}
