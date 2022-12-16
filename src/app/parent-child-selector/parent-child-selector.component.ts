import { ChangeDetectorRef, Directive, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import {
    BehaviorSubject, debounceTime, distinctUntilChanged, filter, finalize, fromEvent, map, Observable, startWith, Subscription, switchMap, tap
} from 'rxjs';

export const isValidNumber = (value: string) => value.length && !isNaN(+value);

@Directive()
export abstract class ParentChildSelectorComponent<ParentEntity, ChildEntity> implements OnInit, OnDestroy {
    filteredParents$!: Observable<ParentEntity[]>;

    public children$: BehaviorSubject<Array<ChildEntity>> = new BehaviorSubject<Array<ChildEntity>>([]);

    protected cd = inject(ChangeDetectorRef);

    @ViewChild('parentInput', { static: true }) parentInput!: ElementRef;
    @ViewChild('childrenInput', { static: true }) childrenInput!: ElementRef;

hasResults$ = this.children$.pipe(map(_ => _.length > 0));

    isLoading = false;

    protected _subscriptions: Array<Subscription> = [];

    /**
     * It provides a form control to manage parent entity.
     */
    get parentControl(): FormControl<any> {
        throw new Error(`${ this.constructor.name } is not providing parentControl`);
    }

    /**
     * It provides a form control to manage child entity.
     */
    get childControl(): FormControl<any> {
        throw new Error(`${ this.constructor.name } is not providing childControl`);
    }

    ngOnInit() {
        if (!this.parentInput)
            throw new Error(`${ this.constructor.name } has not a parent input component`);

        if (!this.childrenInput)
            throw new Error(`${ this.constructor.name } has not a children input component`);

        this.filteredParents$ = this.getFilteredParents$();

        this._subscriptions.push(
            this.manageChildrenProvider()
        );
    }

    ngOnDestroy() {
        this._subscriptions.forEach(_ => _.unsubscribe());
    }

    /**
     * It determines which parent property has to be set into the parent form control
     */
    protected abstract parentControlProperty(parent: ParentEntity): unknown;

    parentSelected(event: MatAutocompleteSelectedEvent) {
        const parent: ParentEntity = (event.option as MatOption<ParentEntity>).value;
        this.parentControl.setValue(this.parentControlProperty(parent));
    }

    /**
     * It determines which child property has to be set into the child form control
     */
    protected abstract childControlProperty(child: ChildEntity): unknown;

    childSelected(event: MatAutocompleteSelectedEvent) {
        const child: ChildEntity = (event.option as MatOption<ChildEntity>).value;
        this.childControl.patchValue(this.childControlProperty(child));
    }

    clearParent(clearInput = false) {
        if (this.parentControl.value) {
            this.parentControl.reset();
            this.children$.next([]);
        }

        if (clearInput)
            (this.parentInput.nativeElement as HTMLInputElement).value = '';
    }

    /**
     * The parent render function into parent autocomplete component
     * @param entity
     */
    abstract parentDisplayFn(entity: ParentEntity): string;

    /**
     * The child render function into child autocomplete component
     * @param entity
     */
    abstract childrenDisplayFn(entity: ChildEntity): string;

    clearChildren(clearInput = false) {
        this.childControl.reset();
        this.children$.next([]);

        if (clearInput)
            (this.childrenInput.nativeElement as HTMLInputElement).value = '';
    }

    /**
     * Placeholder for parent input
     */
    get parentPlaceholder(): string {
        return '';
    }

    /**
     * Placeholder for children input
     */
    get childrenPlaceholder(): string {
        return '';
    }

    /**
     * The parent data set
     */
    protected get parentDataProvider(): Array<ParentEntity> {
        throw new Error(`${ this.constructor.name } is not providing parent data provider`);
    }

    /**
     * The request used to retrieve children from server
     */
    protected getChildrenRequest(parentId: number, childName: string): Observable<Array<ChildEntity>> {
        throw new Error(`${ this.constructor.name } is not providing getChildrenRequest`);
    }

    protected abstract parentStringProperty(parent: ParentEntity): string;

    private filterParentByTextField(value: string): ParentEntity[] {
        const filterValue = value.toLowerCase();
        return this.parentDataProvider.filter(parent => this.parentStringProperty(parent).toLowerCase().includes(filterValue));
    }

    protected abstract parentNumericProperty(parent: ParentEntity): number;

    private filterParentByNumericField(value: number): ParentEntity[] {
        return this.parentDataProvider.filter(parent => this.parentNumericProperty(parent) === value);
    }

    private filterParent(value: string): ParentEntity[] {
        return isValidNumber(value)
            ? this.filterParentByNumericField(+value)
            : this.filterParentByTextField(value);
    }

    private getFilteredParents$() {
        return fromEvent<InputEvent>(this.parentInput.nativeElement, 'input')
            .pipe(
                tap(() => this.clearParent()),
                map(() => (this.parentInput.nativeElement as HTMLInputElement).value),
                startWith(''),
                map((value: string) => this.filterParent(value || '')),
            );
    }

    private manageChildrenProvider(): Subscription {
        return fromEvent<InputEvent>(this.childrenInput.nativeElement, 'input')
            .pipe(
                debounceTime(250),
                map(() => (this.childrenInput.nativeElement as HTMLInputElement).value),
                distinctUntilChanged(),
                tap(() => this.clearChildren()),
                filter((term: string) => term.length > 2),
                tap(() => this.isLoading = true),
                switchMap((term: string) => this.getChildrenRequest(this.parentControl.value, term)
                                                .pipe(
                                                    finalize(() => {
                                                        this.isLoading = false;
                                                        this.cd.markForCheck();
                                                    }))),
            )
            .subscribe(this.children$);
    }
}

