import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable } from 'rxjs';
import { comedy } from '../data';

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
          <!--mat-list-item *ngIf="noResultsFound$ |async">Not Found</mat-list-item-->
          <mat-list-item *ngFor="let item of dataProvider | filterBy: (searchTerm$ | async)">{{item}}</mat-list-item>
        </mat-list>
      </div>
    `,
    styleUrls: ['./search-input-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputListComponent implements OnInit {
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    @Input() dataProvider: Array<string> = comedy;
    @Input() debounceTime = 150;

    //private _destroy$ = inject(DestroyService);
    protected searchTerm$!: Observable<string>;

    ngOnInit() {
        this.searchTerm$ = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
            .pipe(
                debounceTime(this.debounceTime),
                map(() => this.searchInput.nativeElement.value),
                distinctUntilChanged()
                //takeUntil(this._destroy$)
            );
    }
}


