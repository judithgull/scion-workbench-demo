import { Pipe, PipeTransform } from '@angular/core';
import { CityService } from '../service/city.service';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/internal/operators';

/**
 * Resolves to the display text of a city.
 * This pipe works asynchronously and returns an {Observable}.
 *
 * Usage:
 *
 * <span>{{cityId | appFormatCity$ | async}}</span>
 */
@Pipe({
  name: 'appFormatCity$',
  pure: true
})
export class FormatCityPipe implements PipeTransform {

  constructor(private _cityService: CityService) {
  }

  public transform(id: number): Observable<string> {
    return this._cityService.city$(id).pipe(map(city => `${city.name} - ${city.state}`));
  }
}
