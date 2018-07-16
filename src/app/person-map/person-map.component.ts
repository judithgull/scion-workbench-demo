/*
 * Copyright (c) 2018 Swiss Federal Railways
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 *  SPDX-License-Identifier: EPL-2.0
 */

import { Component, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { delay, distinctUntilChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { PersonService } from '../service/person.service';
import { Person } from '../model/person.model';
import { noop, Observable, of, Subject, zip } from 'rxjs/index';
import { CityService } from '../service/city.service';
import { City } from '../model/city.model';
import { WorkbenchRouter, WorkbenchView } from '@scion/workbench';

@Component({
  selector: 'app-person-map',
  template: '',
  styleUrls: ['./person-map.component.scss']
})
export class PersonMapComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();
  private _markers: google.maps.Marker[] = [];

  constructor(personService: PersonService,
              cityService: CityService,
              route: ActivatedRoute,
              router: WorkbenchRouter,
              host: ElementRef,
              view: WorkbenchView) {
    const googleMap: google.maps.Map = new google.maps.Map(host.nativeElement, {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 13,
    });

    // Loads the city for a person
    const loadCity$ = (person: Person): Observable<PersonCityEntry> => cityService.city$(person.city)
      .pipe(map((city: City): PersonCityEntry => ({person: person, city: city})));

    route.paramMap
      .pipe(
        map((paramMap: ParamMap) => paramMap.get('id')),
        distinctUntilChanged(),
        switchMap(id => personService.person$(Number(id))), // load person
        filter(Boolean),
        tap(() => this.clearMarkers()),
        tap((person: Person) => {
          view.title = `${person.firstname} ${person.lastname}`;
          view.heading = `Map of ${person.firstname} and friends`;
        }),
        switchMap((person: Person) => loadCity$(person)), // load the city of the person
        tap(({city, person}) => {
          googleMap.setCenter(new google.maps.LatLng(city.latitude, city.longitude));
          const marker = this.createMarker(googleMap.getCenter(), googleMap, person, '25px', 'blue');
          this._markers.push(marker);
        }),
        switchMap(({person}) => person.friends.length ? personService.persons$(person.friends) : of([])), // load the friends
        switchMap((friends: Person[]) => zip<PersonCityEntry>(...friends.map(it => loadCity$(it)))), // load the cities of the friends
        takeUntil(this._destroy$),
        delay(0)
      )
      .subscribe((entries: PersonCityEntry[]) => {
          const points: google.maps.LatLng[] = [];
          entries.forEach(({city, person}) => {
            const position = new google.maps.LatLng(city.latitude, city.longitude);
            points.push(position);

            const marker = this.createMarker(position, googleMap, person, '15px');
            marker.setClickable(true);
            marker.addListener('click', (): void => {
              router.navigate(['person', person.id]).then(noop);
            });
          });

          googleMap.fitBounds(points.reduce((bounds, point) => bounds.extend(point), new google.maps.LatLngBounds()));
        }
      );
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }

  private clearMarkers(): void {
    this._markers.forEach(it => it.setMap(null));
    this._markers.length = 0;
  }

  private createMarker(position: google.maps.LatLng, googleMap: google.maps.Map, person: Person, fontSize: string, color?: string): google.maps.Marker {
    const marker = new google.maps.Marker({
      position: position,
      map: googleMap,
      title: `${person.firstname} ${person.lastname}`,
      label: {
        text: `${person.firstname} ${person.lastname}`,
        fontWeight: 'bold',
        fontSize: fontSize,
        color: color
      },
    });
    this._markers.push(marker);
    return marker;
  }
}

interface PersonCityEntry {
  person: Person;
  city: City;
}
