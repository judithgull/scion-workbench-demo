import { Component } from '@angular/core';
import { Notification } from '@scion/workbench';

@Component({
  selector: 'app-entity-stored-notification',
  templateUrl: './link-notification.component.html'
})
export class LinkNotificationComponent {

  public input: Link;

  constructor(notification: Notification) {
    this.input = notification.input;
  }
}

export interface Link {
  message: string;
  linkCommand: any[];
  linkText: string;
}
