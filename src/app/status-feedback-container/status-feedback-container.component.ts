import { CommonModule } from '@angular/common';
import {
    AfterContentInit, ChangeDetectionStrategy, Component, ComponentRef, ContentChild, Directive, Input, OnChanges, SimpleChanges, TemplateRef,
    ViewChild, ViewContainerRef
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentViewDirective } from '../content-view.directive';
import { ErrorComponent } from './error.component';
import { LoadingComponent } from './loading.component';
import { SkeletonComponent } from './skeleton.component';

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
    imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
    template: `
      <ng-template #anchor></ng-template>
      <!-- LOADING -->
      <!--div class="centered-container"
           *ngIf="loading && !error">
        <ng-container *ngTemplateOutlet="loadingView?.tmpl || defaultLoadingTmpl"></ng-container>
      </div>

      <div class="centered-container"
           *ngIf="error">
        <ng-container *ngTemplateOutlet="errorView?.tmpl || defaultErrorTmpl"></ng-container>
      </div>

      <div class="centered-container"
           *ngIf="!error && firstLoad">
        <ng-container *ngTemplateOutlet="contentView.tmpl"></ng-container>
      </div-->

      <ng-template #defaultLoadingTmpl>
        <mat-spinner
            color="accent"></mat-spinner>
      </ng-template>

      <ng-template #defaultErrorTmpl>
        <mat-icon>report</mat-icon>
      </ng-template>
    `,
    styleUrls: ['./status-feedback-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusFeedbackContainerComponent implements AfterContentInit, OnChanges {
    @Input() data!: string | null;
    @Input() loading!: boolean | null;
    @Input() error!: boolean | null;

    errorRef: ComponentRef<ErrorComponent> | null = null;
    skeletonRef: ComponentRef<SkeletonComponent> | null = null;
    loadingRef: ComponentRef<LoadingComponent> | null = null;

    _dataFirstLoadDone = false;

    @ContentChild(ContentViewDirective) contentView!: ContentViewDirective;
    @ContentChild(LoadingViewDirective) loadingView: LoadingViewDirective | undefined;
    @ContentChild(ErrorViewDirective) errorView: ErrorViewDirective | undefined;

    @ViewChild('anchor', { read: ViewContainerRef, static: true }) _vcr!: ViewContainerRef;

    ngAfterContentInit(): void {
        if (!this.contentView) {
            throw new Error('ContentViewDirective has not been specified.');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const { loading, error, data } = changes;
        //  console.log('is loading?', loading);

        if (!this._dataFirstLoadDone && !this.skeletonRef) {
            this.skeletonRef = this._vcr.createComponent(SkeletonComponent);
        }

        if (data && data.currentValue) {
            this._dataFirstLoadDone = true;
            if (this.skeletonRef)
                this._vcr.remove(this._vcr.indexOf(this.skeletonRef.hostView));

            this._vcr.createEmbeddedView(this.contentView.tmpl);
        }

        if (loading && this._dataFirstLoadDone) {
            if (!!loading.currentValue) {
                this.loadingRef = this._vcr.createComponent(LoadingComponent);
            } else if (this.loadingRef?.hostView) {
                this._vcr.remove(this._vcr.indexOf(this.loadingRef?.hostView));
            }
        }
    }
}

