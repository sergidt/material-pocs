import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, inject, Inject, InjectionToken, Input, OnDestroy, OnInit,
    Optional, Self, ViewChild
} from '@angular/core';
import {
    AbstractControl, ControlValueAccessor, FormBuilder, NgControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import {
    MAT_LEGACY_FORM_FIELD as MAT_FORM_FIELD, MatLegacyFormField as MatFormField, MatLegacyFormFieldControl as MatFormFieldControl,
    MatLegacyFormFieldModule as MatFormFieldModule
} from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import {
    BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, filter, finalize, fromEvent, map, Observable, Subject, Subscription,
    switchMap, takeUntil, tap
} from 'rxjs';

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Provide us with the necessary tools
 * to deal with the functionality needed for this generic search input component.
 * @interface SearchInputConfig
 * @property {resultDisplayFn} used to provide a displayWith fn to mat-autocomplete.
 * @property {searchRequest} the api request we need to make the search.
 * @property {searchTypeGuard} a type guard we will use to validate if the input value is a valid type.
 * @property {minLength} min length required for the input to trigger the api request.
 * @property {debounceTime}  the time we will set when we manage the request.
 */
export interface SearchInputConfig<T> {
    resultDisplayFn: (item: T) => string;
    searchRequest: (id: string, term: string) => Observable<Array<T>>;
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
    templateUrl: './search-input-list.component.html',
    styleUrls: ['./search-input-list.component.scss'],
    providers: [{ provide: MatFormFieldControl, useExisting: SearchInputListComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputListComponent implements OnDestroy, OnInit {
    static nextId = 0;

   // @HostBinding('class') className = ComponentClass;

    @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

    formGroup = this._formBuilder.group({
        search: this._formBuilder.control('',  [this.searchInputValidator()]),
    });

    config: SearchInputConfig<unknown> = inject(SEARCH_INPUT_CONFIG);
    results$: BehaviorSubject<Array<unknown>> = new BehaviorSubject<Array<unknown>>([]);

    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private searchInputValue$: BehaviorSubject<string> = new BehaviorSubject('');

    noResultsFound$ = combineLatest([
        this.searchInputValue$,
        this.results$,
        this.isLoading$
    ]).pipe(
        map(([search, results, isLoading]: [string, Array<unknown>, boolean]) =>
            minSearchTextLength(this.searchMinLength())(search)
            && !results.length && !isLoading
        )
    );

    //MatFormFieldControl properties

    stateChanges = new Subject<void>();
    focused = false;
    touched = false;
    controlType = 'custom-search-input';

    id = `${ this.controlType }-${ SearchInputListComponent.nextId++ }`;
    //private _destroy$ = inject(DestroyService);

    get empty() {
        return !this.formGroup.controls.search.value;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input() userAriaDescribedBy!: string;

    private _searchBy!: string;

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    private _placeholder!: string;

    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.formGroup.disable() : this.formGroup.enable();
        this.stateChanges.next();
    }

    private _disabled = false;

    @Input()
    get value(): string | null {
        return this.formGroup.valid ? this.formGroup.controls.search.value : null;
    }

    set value(value: string | null) {
        const formValue = value || '';
        this.formGroup.controls.search.setValue(formValue);
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.formGroup.invalid;
    }

    onChange = (_: string | null) => {
    };

    onTouched = () => {
    };

    private searchMinLength = () => this.config.minLength || 2;

    constructor(
        private _formBuilder: FormBuilder,
        private _cd: ChangeDetectorRef,
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
        @Optional() @Self() public ngControl: NgControl,
    ) {
        if (this.ngControl)
            this.ngControl.valueAccessor = this;
    }

    ngOnInit() {
        //assertIsDefined(this.config, `${ this.constructor.name } search input config has not been provided`);

        fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
            .pipe(
                debounceTime(this.config.debounceTime || 500),
                map(() => this.searchInput.nativeElement.value),
                distinctUntilChanged(),
                //takeUntil(this._destroy$)
            )
            .subscribe(this.searchInputValue$);

        this.manageSearchInputProvider();
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    onFocusIn(event: FocusEvent) {
        if (!this.focused) {
            this.focused = true;
            this.stateChanges.next();
        }
    }

    onFocusOut(event: FocusEvent) {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
            this.touched = true;
            this.focused = false;
            this.onTouched();
            this.stateChanges.next();
        }
    }

    setDescribedByIds(ids: string[]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const controlElement = this._elementRef.nativeElement.querySelector(
            '.custom-input-search-container',
        )!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick() {
        if (this.formGroup.valid) {
            this._focusMonitor.focusVia(this.searchInput, 'program');
        }
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    handleSelectedOption(value: any) {
        this.onChange(value);
        this.formGroup.controls.search.patchValue(value);
        this.stateChanges.next();
    }

    /**
     * Custom input validator which will tell if the input value is a valid
     * type, for such matter we use the type guard provided in the
     * @interface {SearchInputConfig}.
     * @private
     */
    private searchInputValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            return !value || !this.config.searchTypeGuard(value) ? { empty: true } : null;
        };
    }

    /**
     * Manage the search input when the user is typing on it, when the
     * user typed three or more characters and stopped during one second, we will
     * do an api request.
     * @private
     */
    private manageSearchInputProvider(): Subscription {
        return this.searchInputValue$
                   .pipe(
                       filter(minSearchTextLength(this.searchMinLength())),
                       tap(() => this.isLoading$.next(true)),
                       switchMap((term: string) => this.config.searchRequest(this._searchBy, term)
                                                       .pipe(finalize(() => this.isLoading$.next(false)))
                       ),
                       //takeUntil(this._destroy$),
                   )
                   .subscribe(this.results$);
    }
}
