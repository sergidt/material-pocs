import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddColumnDirective } from './add-column.directive';

import { AppComponent } from './app.component';
import { ApplicationShellComponent } from './application-shell/application-shell.component';
import { BusinessUnitTypeBusinessUnit } from './but-bu-selector.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentViewDirective } from './content-view.directive';
import { MaterialModule } from './material.module';
import { SelectableTableComponent } from './selectable-table/selectable-table.component';
import { SelectedItemsComponent } from './selected-items/selected-items.component';
import {
    ErrorViewDirective, StatusFeedbackContainerComponent
} from './status-feedback-container/status-feedback-container.component';
import { StepperNavigatorComponent } from './stepper-navigator/stepper-navigator.component';

@NgModule({
    declarations: [
        AppComponent,
        SelectableTableComponent,
        AddColumnDirective,
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
        SelectedItemsComponent,
        StepperNavigatorComponent,
        ApplicationShellComponent,
        StatusFeedbackContainerComponent,
        DashboardComponent,
        ErrorViewDirective,
        ContentViewDirective
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
