import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { comedy } from '../data';

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Provide us with the necessary tools
 * to deal with the functionality needed for this generic search input component.
 * @interface SearchInputConfig
 * @property {searchTypeGuard} a type guard we will use to validate if the input value is a valid type.
 * @property {minLength} min length required for the input to trigger the api request.
 * @property {debounceTime}  the time we will set when we manage the request.
 */
export interface SearchInputConfig<T> {
    searchTypeGuard: (value: T) => boolean;
    minLength?: number;
    debounceTime?: number;
}

const minSearchTextLength = (min: number) => (search: string) => search.length > min;

@Component({
    selector: 'app-search-input-list',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatLegacyListModule,

    ],
    template: `
      <div class="custom-input-search-container">
        <input #searchInput
               matInput/>
        <mat-list>
          <!--mat-list-item *ngIf="noResultsFound$ |async">Not Found</mat-list-item-->
          <!--mat-list-item *ngFor="let result of results$ | async">{{config.resultDisplayFn(result)}}</mat-list-item-->
        </mat-list>
      </div>
    `,
    styleUrls: ['./search-input-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputListComponent implements OnDestroy, OnInit {
    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    dataProvider: Array<string> = comedy;

    //private _destroy$ = inject(DestroyService);
    ngOnDestroy() {
    }

    ngOnInit() {
        //assertIsDefined(this.config, `${ this.constructor.name } search input config has not been provided`);

        fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
            .pipe(
                debounceTime(500),
                map(() => this.searchInput.nativeElement.value),
                distinctUntilChanged(),
                //takeUntil(this._destroy$)
            )
            .subscribe(console.log);

    }
}
