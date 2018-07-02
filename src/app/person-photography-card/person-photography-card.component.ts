import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-photography-card',
  templateUrl: './person-photography-card.component.html',
  styleUrls: ['./person-photography-card.component.scss']
})
export class PersonPhotographyCardComponent {

  @Input()
  public photo: string;
}
