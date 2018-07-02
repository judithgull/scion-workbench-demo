import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/app-form.component';
import { ProposalFieldPopupComponent } from './proposal-field/proposal-popup/proposal-field-popup.component';
import { ProposalFieldDirective } from './proposal-field/proposal-field.directive';
import { FilterFieldComponent } from './filter-field/filter-field.component';
import { LinkNotificationComponent } from './link-notification/link-notification.component';
import { WorkbenchModule } from '@scion/workbench';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormComponent,
    ProposalFieldPopupComponent,
    ProposalFieldDirective,
    FilterFieldComponent,
    LinkNotificationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkbenchModule.forChild(),
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    FormComponent,
    ProposalFieldDirective,
    FilterFieldComponent,
  ],
  entryComponents: [
    ProposalFieldPopupComponent,
    LinkNotificationComponent,
  ],
})
export class WidgetModule {
}
