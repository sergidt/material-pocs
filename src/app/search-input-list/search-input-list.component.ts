import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, Input, OnInit, Pipe, PipeTransform, ViewChild
} from '@angular/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith, takeUntil } from 'rxjs';
import { DestroyService } from '../services/destroy.service';

@Pipe({
    standalone: true,
    name: 'filterBy',
    pure: true
})
export class FilterByPipe<T> implements PipeTransform {
    transform(items: Array<T>, searchTerm: string | null, filterFunction?: (item: T, term: string) => boolean): Array<T> {
        const filterFn = !filterFunction ? (item: T, term: string) => String(item).toLowerCase().includes(term.toLowerCase()) : filterFunction;

        return !items ? []
            : !searchTerm ? items
                : items.filter((item: T) => filterFn(item, searchTerm));
    }
}

@Component({
    selector: 'app-search-input-list',
    standalone: true,
    imports: [
        CommonModule,
        MatInputModule,
        MatLegacyListModule,
        FilterByPipe
    ],
    template: `
      <div class="custom-input-search-container">
        <input #searchInput
               matInput/>
        <mat-list>
          <mat-list-item *ngIf="resultsCount === 0">No results found filtering by this term</mat-list-item>
          <mat-list-item *ngFor="let item of filteredResults">
            <ng-container *ngTemplateOutlet="defaultTmpl; context: {$implicit: item}"></ng-container>
          </mat-list-item>
        </mat-list>
      </div>

      <ng-template #defaultTmpl
                   let-item>
        <div>{{item}}</div>
      </ng-template>
    `,
    providers: [DestroyService],
    styleUrls: ['./search-input-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputListComponent implements OnInit {
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
    @Input() debounceTime = 150;

    filteredResults: Array<string> = [];
    resultsCount!: number;

    @Input()
    set dataProvider(value: Array<string>) {
        this._dataProvider$.next(value);
    }

    private _destroy$ = inject(DestroyService);
    private filterBy = new FilterByPipe();
    private _dataProvider$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

    private _cd = inject(ChangeDetectorRef);

    ngOnInit() {
        const searchTerm$: Observable<string> = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
            .pipe(
                debounceTime(this.debounceTime),
                map(() => this.searchInput.nativeElement.value),
                distinctUntilChanged(),
                startWith(''),
            );

        combineLatest([this._dataProvider$, searchTerm$])
            .pipe(
                map(([dataProvider, term]: [Array<string>, string]) => this.filterBy.transform(dataProvider, term) as Array<string>),
                takeUntil(this._destroy$)
            )
            .subscribe((filtered: Array<string>) => {
                this.filteredResults = filtered;
                this.resultsCount = this.filteredResults.length;
                this._cd.markForCheck();
            });
    }
}

/*
1- generic data provider
2- custom item template
3- styles
4- show into main app
 */

