/*
 * Copyright (c) 2018 Swiss Federal Railways
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 *  SPDX-License-Identifier: EPL-2.0
 */

import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Person } from '../model/person.model';
import { MatCardContent } from '@angular/material';
import { CityService } from '../service/city.service';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { noop, Subject } from 'rxjs';
import { City } from '../model/city.model';
import { WorkbenchRouter } from '@scion/workbench';

@Component({
  selector: 'app-person-map-card',
  templateUrl: './person-map-card.component.html',
  styleUrls: ['./person-map-card.component.scss']
})
export class PersonMapCardComponent implements AfterViewInit, OnChanges, OnDestroy {

  private _destroy$ = new Subject<void>();
  private _personChange$ = new Subject<void>();
  private _googleMap: google.maps.Map;
  private _marker: google.maps.Marker;

  @ViewChild(MatCardContent, {read: ElementRef})
  public cardContent: ElementRef;

  @Input()
  public person: Person;

  constructor(private _cityService: CityService,
              private _router: WorkbenchRouter) {
  }

  public ngAfterViewInit(): void {
    this._googleMap = new google.maps.Map(this.cardContent.nativeElement, {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.updateMap();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.updateMap();
  }

  public onOpen(event: Event): void {
    event.stopPropagation();
    this._router.navigate(['person', this.person.id, 'map'], {target: 'blank'}).then(noop);
  }

  private updateMap(): void {
    if (!this._googleMap) {
      return;
    }

    this._personChange$.next();
    this._cityService.city$(this.person.city)
      .pipe(
        takeUntil(this._personChange$),
        takeUntil(this._destroy$),
        tap(() => this._marker && this._marker.setMap(null)),
        filter(Boolean),
      ).subscribe((city: City) => {
      this._googleMap.setCenter(new google.maps.LatLng(city.latitude, city.longitude));
      this._marker = new google.maps.Marker();
      this._marker.setPosition(this._googleMap.getCenter());
      this._marker.setMap(this._googleMap);
      this._marker.setTitle(`${this.person.firstname} ${this.person.lastname}`);
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
