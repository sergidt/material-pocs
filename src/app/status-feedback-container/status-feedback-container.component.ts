import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-status-feedback-container',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
    template: `
      <div class="spinner-container"
           *ngIf="loading && !error">
        <ng-container *ngTemplateOutlet="loadingTmpl || defaultLoadingTmpl"></ng-container>
      </div>

      <div class="spinner-container"
           *ngIf="error">
        <ng-container *ngTemplateOutlet="errorTmpl || defaultErrorTmpl"></ng-container>
      </div>

      <ng-content></ng-content>

      <ng-template #defaultLoadingTmpl>
        <mat-spinner
            color="accent"></mat-spinner>
      </ng-template>

      <ng-template #defaultErrorTmpl>
        <mat-icon>report</mat-icon>
      </ng-template>
    `,
    styleUrls: ['./status-feedback-container.component.scss']
})
export class StatusFeedbackContainerComponent {
    @Input() loading!: boolean | null;
    @Input() error!: boolean | null;

    @ContentChild('loadingTmpl') loadingTmpl!: TemplateRef<any>;
    @ContentChild('errorTmpl') errorTmpl!: TemplateRef<any>;
}

