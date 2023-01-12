import { CommonModule } from '@angular/common';
import {
    AfterContentInit, ChangeDetectionStrategy, Component, ComponentRef, ContentChild, Directive, Input, OnChanges, SimpleChanges, TemplateRef,
    ViewChild, ViewContainerRef
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorComponent } from './error.component';
import { LoadingComponent } from './loading.component';
import { SkeletonComponent } from './skeleton.component';

@Directive({
    selector: '[contentView]',
    standalone: true
})
export class ContentViewDirective {
    constructor(public tmpl: TemplateRef<any>) {
    }
}

@Directive({
    selector: '[errorView]',
    standalone: true
})
export class ErrorViewDirective {

    constructor(public tmpl: TemplateRef<any>) {
    }

}

@Directive({
    selector: '[loadingView]',
    standalone: true
})
export class LoadingViewDirective {
    constructor(public tmpl: TemplateRef<any>) {
    }
}

@Component({
    selector: 'app-status-feedback-container',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, SkeletonComponent],
    template: `
      <ng-template #anchor></ng-template>
      <!-- LOADING -->
      <div class="centered-container"
           *ngIf="loading && !error && dataFirstLoadDone">
        <ng-container *ngTemplateOutlet="loadingView?.tmpl || defaultLoadingTmpl"></ng-container>
      </div>

      <div class="centered-container"
           *ngIf="error">
        <ng-container *ngTemplateOutlet="errorView?.tmpl || defaultErrorTmpl"></ng-container>
      </div>

      <div class="centered-container"
           *ngIf="!error">
        <ng-container *ngTemplateOutlet="dataFirstLoadDone ? contentView!.tmpl : skeleton"></ng-container>
      </div>

      <ng-template #defaultLoadingTmpl>
        <mat-spinner
            color="accent"></mat-spinner>
      </ng-template>

      <ng-template #defaultErrorTmpl>
        <mat-icon>report</mat-icon>
        <h3>Any error occured!</h3>
      </ng-template>

      <ng-template #skeleton>
        <skeleton></skeleton>
      </ng-template>
    `,
    styleUrls: ['./status-feedback-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusFeedbackContainerComponent implements AfterContentInit, OnChanges {
    @Input() loading!: boolean | null;
    @Input() error!: boolean | null;
    errorRef: ComponentRef<ErrorComponent> | null = null;
    skeletonRef: ComponentRef<SkeletonComponent> | null = null;
    loadingRef: ComponentRef<LoadingComponent> | null = null;
    dataFirstLoadDone = false;
    @ContentChild(ContentViewDirective) contentView!: ContentViewDirective | null;
    @ContentChild(LoadingViewDirective) loadingView: LoadingViewDirective | undefined;
    @ContentChild(ErrorViewDirective) errorView: ErrorViewDirective | undefined;
    @ViewChild('anchor', { read: ViewContainerRef, static: true }) _vcr!: ViewContainerRef;

    private _data!: any | null;

    get data(): any {
        return this._data;
    }

    @Input()
    set data(value: any) {
        this._data = value;

        if (this._data)
            this.dataFirstLoadDone = true;
    }

    ngOnChanges(changes: SimpleChanges) {
        Object.keys(changes).forEach(key => console.log(key, ': ', changes[key].currentValue));
    }

    ngAfterContentInit(): void {
        if (!this.contentView) {
            throw new Error('ContentViewDirective has not been specified.');
        }
    }
}

