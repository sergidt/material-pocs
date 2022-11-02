import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, finalize, fromEvent, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { BusinessUnit, BusinessUnitType, Service } from './data';

const isValidId = (value: string) => value.length && !isNaN(+value);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    fg!: FormGroup;

    filteredButs$!: Observable<BusinessUnitType[]>;

    public buList$: BehaviorSubject<Array<BusinessUnit>> = new BehaviorSubject<Array<BusinessUnit>>([]);

    private service = inject(Service);

    private cd = inject(ChangeDetectorRef);

    public butIdControl: FormControl<number> = new FormControl();
    public buIdControl: FormControl<number> = new FormControl();

    @ViewChild('butInput', { static: true }) butInput!: ElementRef;
    @ViewChild('buInput', { static: true }) buInput!: ElementRef;

    isLoading = false;

    ngOnInit() {
        this.butIdControl.valueChanges
            .subscribe(_ => console.log('selected but Id:', _));
        /*    this.butIdControl.valueChanges
                .pipe(
                    tap(_ => console.log('selected but Id:', _)),
                    filter(_ => !!_),
                    exhaustMap((_: number) => this.service.findBusinessUnits(_, ''))
                )
                .subscribe(this.buList$);

         */

        this.filteredButs$ = this.getFilteredButs$();

        this.businessUnitsRequest();
    }

    private getFilteredButs$() {
        return fromEvent<InputEvent>(this.butInput.nativeElement, 'input')
            .pipe(
                tap(() => this.clearBUT()),
                map(() => (this.butInput.nativeElement as HTMLInputElement).value),
                startWith(''),
                map((value: string) => this.filter(value || '')),
                tap(_ => console.log('Filtered buts: ', _))
            );
    }

    private businessUnitsRequest() {
        fromEvent<InputEvent>(this.buInput.nativeElement, 'input')
            .pipe(
                debounceTime(250),
                map(() => (this.buInput.nativeElement as HTMLInputElement).value),
                distinctUntilChanged(),
                tap(() => this.clearBU()),
                filter((term: string) => term.length > 2),
                tap(() => this.isLoading = true),
                switchMap((term: string) => this.service.findBusinessUnits(this.butIdControl.value, term)
                                                .pipe(
                                                    finalize(() => {
                                                        this.isLoading = false;
                                                        this.cd.markForCheck();
                                                    }))),
                tap(_ => console.log('BU result', _))
            )
            .subscribe(this.buList$);

        this.buList$.subscribe(_ => console.log('filtered BU', _));
    }

    private filter(value: string): BusinessUnitType[] {
        return isValidId(value)
            ? this.filterByBUTId(+value)
            : this.filterByBUTName(value);
    }

    private filterByBUTName(value: string): BusinessUnitType[] {
        const filterValue = value.toLowerCase();
        return this.service.butList.filter(genre => genre.name.toLowerCase().includes(filterValue));
    }

    private filterByBUTId(id: number): BusinessUnitType[] {
        return this.service.butList.filter(genre => genre.id === id);
    }

    butSelected(event: MatAutocompleteSelectedEvent) {
        this.butIdControl.patchValue((event.option as MatOption<BusinessUnitType>).value.id);
    }

    buSelected(event: MatAutocompleteSelectedEvent) {
        this.buIdControl.patchValue((event.option as MatOption<BusinessUnit>).value.id);
    }

    clearBUT(clearInput = false) {
        if (this.butIdControl.value) {
            this.butIdControl.reset();
            this.buList$.next([]);
        }

        if (clearInput)
            (this.butInput.nativeElement as HTMLInputElement).value = '';
    }

    butDisplayFn(but: BusinessUnitType): string {
        return but ? `${ but.id }-${ but.name }` : '';
    }

    buDisplayFn(bu: BusinessUnit): string {
        return bu ? bu.name : '';
    }

    clearBU(clearInput = false) {
        this.buIdControl.reset();
        this.buList$.next([]);

        if (clearInput)
            (this.buInput.nativeElement as HTMLInputElement).value = '';
    }
}
