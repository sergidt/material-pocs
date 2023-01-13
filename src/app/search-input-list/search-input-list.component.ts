import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, inject, Input, OnInit, Pipe, PipeTransform,
    TemplateRef, ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, Observable, startWith, takeUntil } from 'rxjs';
import { DestroyService } from '../services/destroy.service';
import { LoadingViewDirective } from '../suspense/status-feedback-container/status-feedback-container.component';


@Directive({
    selector: '[resultView]',
    standalone: true
})
export class ResultViewDirective {
    constructor(public tmpl: TemplateRef<any>) {
    }
}

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
        FilterByPipe,
        FormsModule,
    ],
    template: `
      <div>
            <input #searchInput matInput  type="text"/>
        
        <mat-list>
          <mat-list-item *ngIf="resultsCount === 0">No results found filtering by this term</mat-list-item>
          <mat-list-item *ngFor="let item of filteredResults">
            <ng-container *ngTemplateOutlet="resultView?.tmpl ||defaultTmpl; context: {$implicit: item}"></ng-container>
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
export class SearchInputListComponent<T> implements OnInit {

    @ContentChild(ResultViewDirective) resultView: ResultViewDirective | undefined;
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
    @Input() debounceTime = 150;

    filteredResults: Array<T> = [];
    resultsCount!: number;

    @Input()
    set dataProvider(value: Array<T>) {
        this._dataProvider$.next(value);
    }

    private _destroy$ = inject(DestroyService);
    private filterBy = new FilterByPipe();
    private _dataProvider$: BehaviorSubject<Array<T>> = new BehaviorSubject<Array<T>>([]);

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
                map(([dataProvider, term]: [Array<T>, string]) => this.filterBy.transform(dataProvider, term) as Array<T>),
                takeUntil(this._destroy$)
            )
            .subscribe((filtered: Array<T>) => {
                this.filteredResults = filtered;
                this.resultsCount = this.filteredResults.length;
                this._cd.markForCheck();
            });
    }
}

/*
 styles
 */

