import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

export interface Section {
    name: string;
    index: number;
}

@Component({
    selector: 'app-navigation-bar',
    standalone: true,
    imports: [CommonModule, MatButtonToggleModule],
    template: `
      <mat-button-toggle-group #navigationBar
                               [
                               (change)="manageChange($event)">
        <mat-button-toggle *ngFor="let section of sections"
                           [value]="section">{{section.name}}</mat-button-toggle>
      </mat-button-toggle-group>
    `,
    styleUrls: ['./navigation-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements AfterViewInit {
    @Output() selectionChanged: EventEmitter<Section> = new EventEmitter<Section>();

    private _sections: Array<Section> = [];

    get sections(): Array<Section> {
        return this._sections;
    }

    @Input()
    set sections(value: Array<Section>) {
        this._sections = value;
        if (this._sections.length)
            this.selectedIndex = 0;
    }

    private _selectedIndex: number = -1;

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    set selectedIndex(value: number) {
        this._selectedIndex = value;

        this.selectionChanged.emit(this.sections.at(this._selectedIndex));
    }

    ngAfterViewInit() {
        if (this._selectedIndex < 0)
            this.selectedIndex = 0;
    }

    manageChange(event: MatButtonToggleChange) {
        this.selectionChanged.emit(event.value as Section);
    }
}
