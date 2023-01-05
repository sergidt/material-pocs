import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { Observable } from 'rxjs';
import { BusinessUnit, BusinessUnitType, Service } from './data';
import { ParentChildSelectorComponent } from './parent-child-selector/parent-child-selector.component';

export const isValidNumber = (value: string) => value.length && !isNaN(+value);

@Component({
    selector: 'but-bu-selector',
    imports: [CommonModule,
              MatAutocompleteModule,
              MatIconModule,
              MatFormFieldModule,
              MatButtonModule,
              MatInputModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './parent-child-selector/parent-child-selector.component.html',
    styleUrls: ['./parent-child-selector/parent-child-selector.component.scss']
})
export class BusinessUnitTypeBusinessUnit extends ParentChildSelectorComponent<BusinessUnitType, BusinessUnit> {
    private service = inject(Service);

    butIdControl = new FormControl();
    buIdControl = new FormControl();

    override get parentControl(): FormControl {
        return this.butIdControl;
    }

    override get childControl(): FormControl {
        return this.buIdControl;
    }

    override get parentPlaceholder(): string {
        return 'Business Unit Type';
    }

    override get childrenPlaceholder(): string {
        return 'Business Unit';
    }

    parentDisplayFn(but: BusinessUnitType): string {
        return but ? `${ but.id }-${ but.name }` : '';
    }

    childrenDisplayFn(bu: BusinessUnit): string {
        return bu ? bu.name : '';
    }

    override get parentDataProvider(): Array<BusinessUnitType> {
        return this.service.butList;
    }

    protected override parentStringProperty(but: BusinessUnitType): string {
        return but.name;
    }

    protected override parentNumericProperty(but: BusinessUnitType): number {
        return but.id;
    }

    protected override parentControlProperty(but: BusinessUnitType): number {
        return but.id;
    }

    protected override childControlProperty(bu: BusinessUnit): number {
        return bu.id;
    }

    protected override getChildrenRequest(parentId: number, childName: string): Observable<Array<BusinessUnit>> {
        return this.service.findBusinessUnits(parentId, childName);
    }
}

