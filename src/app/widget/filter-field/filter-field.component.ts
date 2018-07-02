import { Attribute, Component, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  public filterControl = new FormControl();

  @Output()
  public filter = new EventEmitter<string>();

  constructor(@Attribute('placeholder') public placeholder: string) {
    this.filterControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(filter => {
        this.filter.emit(filter);
      });
  }

  @HostListener('keydown', ['$event'])
  public onKey(event: KeyboardEvent): void {
    event.stopPropagation(); // prevent event from being handled by main content
  }

  public onClear(event: Event): void {
    event.stopPropagation();
    this.filterControl.setValue('');
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
  }
}
