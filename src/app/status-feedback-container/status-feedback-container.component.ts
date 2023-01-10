import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContentViewDirective } from '../content-view.directive';

@Directive({
    selector: '[errorView]',
    standalone: true
})
export class ErrorViewDirective {

    constructor(public tmpl: TemplateRef<any>) { }

}

@Directive({
    selector: '[loadingView]',
    standalone: true
})
export class LoadingViewDirective {

    constructor(public tmpl: TemplateRef<any>) { }

}


@Component({
    selector: 'app-status-feedback-container',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
    templateUrl: 'status-feedback-container.component.html',
    styleUrls: ['./status-feedback-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusFeedbackContainerComponent implements AfterContentInit, OnInit{


    @Input() loading!: boolean | null;
    @Input() error!: boolean | null;

    @ContentChild(ContentViewDirective) contentView!: ContentViewDirective;
    @ContentChild(LoadingViewDirective) loadingView: LoadingViewDirective | undefined;
    @ContentChild(ErrorViewDirective) errorView: ErrorViewDirective | undefined;

    ngOnInit(): void {
        console.log('init');

    }


    ngAfterContentInit(): void {
        console.log(`ContentView: ${this.contentView?.tmpl} `);
        if (!this.contentView) {
            throw new Error('ContentViewDirective has not been specified.')
        }

    }
}

