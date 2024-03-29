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
import { IndexedDBExampleComponent } from './indexedDB/indexed-db-example/indexed-db-example.component';
import { MaterialModule } from './material.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AccessControlDirective } from './rbac/access-control.directive';
import { RolesAndPermissionsComponent } from './roles-permissions/roles-permissions.component';
import { SearchInputExampleComponent } from './search-input-example/search-input-example.component';
import { SearchInputListComponent } from './search-input-example/search-input-list/search-input-list.component';
import { SelectableTableComponent } from './selectable-table/selectable-table.component';
import { SelectedItemsComponent } from './selected-items/selected-items.component';
import { StepperNavigatorComponent } from './stepper-navigator/stepper-navigator.component';
import { DummyListComponent } from './suspense/status-feedback-container/dummy-list.component';
import { SkeletonComponent } from './suspense/status-feedback-container/skeleton.component';
import { StatusFeedbackContainerComponent } from './suspense/status-feedback-container/status-feedback-container.component';
import { SuspenseExampleComponent } from './suspense/suspense-example/suspense-example.component';

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
        SelectedItemsComponent,
        StepperNavigatorComponent,
        ApplicationShellComponent,
        StatusFeedbackContainerComponent,
        SkeletonComponent,
        DummyListComponent,
        NavigationBarComponent,
        SuspenseExampleComponent,
        SearchInputListComponent,
        SearchInputExampleComponent,
        IndexedDBExampleComponent,
        DashboardComponent,
        AccessControlDirective,
        RolesAndPermissionsComponent,
    ],
    providers: [AccessControlDirective],
    bootstrap: [AppComponent]
})
export class AppModule {
}
