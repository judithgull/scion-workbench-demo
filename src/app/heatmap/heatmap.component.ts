import { Component, ElementRef, OnDestroy } from '@angular/core';
import { delay, map, switchMap, takeUntil } from 'rxjs/internal/operators';
import { PersonService } from '../service/person.service';
import { Person } from '../model/person.model';
import { Observable, Subject, zip } from 'rxjs/index';
import { CityService } from '../service/city.service';
import { City } from '../model/city.model';
import { WorkbenchView } from '@scion/workbench';

@Component({
  selector: 'app-heatmap',
  template: '',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(personService: PersonService,
              cityService: CityService,
              host: ElementRef,
              view: WorkbenchView) {
    view.title = 'Heatmap';
    view.heading = 'Map of homes places';

    const googleMap: google.maps.Map = new google.maps.Map(host.nativeElement, {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    personService.persons$()
      .pipe(
        delay(0),
        switchMap((persons: Person[]): Observable<City[]> => zip(...persons.map(it => cityService.city$(it.city)))),
        map((cities: City[]) => cities.map(city => new google.maps.LatLng(city.latitude, city.longitude))),
        map(((heatmapData: google.maps.LatLng[]): google.maps.visualization.HeatmapLayer => new google.maps.visualization.HeatmapLayer({data: heatmapData}))),
        takeUntil(this._destroy$)
      )
      .subscribe((heatmapLayer: google.maps.visualization.HeatmapLayer) => {
        heatmapLayer.setMap(googleMap);

        // fit bounds to cover all points
        const points = heatmapLayer.getData<google.maps.LatLng>().getArray();
        googleMap.fitBounds(points.reduce((bounds, point) => bounds.extend(point), new google.maps.LatLngBounds()));
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
