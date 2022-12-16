import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BusinessUnitTypeBusinessUnit } from './but-bu-selector.component';
import { SelectedItemsComponent } from './selected-items/selected-items.component';
import { SelectableTableComponent } from './selectable-table/selectable-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialModule } from './material.module';
import { AddColumnDirective } from './add-column.directive';
@NgModule({
    declarations: [
        AppComponent,
        SelectableTableComponent,
        AddColumnDirective
    ],
    imports: [
        MaterialModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        BusinessUnitTypeBusinessUnit,
        SelectedItemsComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
