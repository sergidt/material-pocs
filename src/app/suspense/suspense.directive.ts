import { ComponentRef, Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { ErrorComponent } from './error.component';
import { LoadingComponent } from './loading.component';
import { SkeletonComponent } from './skeleton.component';

@Directive({
    selector: '[suspense]',
    standalone: true
})
export class SuspenseDirective implements OnChanges {
    @Input('suspense') isLoading!: boolean | null;
    @Input('suspenseHasError') hasError!: boolean | null;
    @Input('suspenseData') data!: null | any;
    errorRef: ComponentRef<ErrorComponent> | null = null;
    skeletonRef: ComponentRef<SkeletonComponent> | null = null;
    loadingRef: ComponentRef<LoadingComponent> | null = null;

    constructor(private tpl: TemplateRef<any>,
        private vcr: ViewContainerRef) {

    }

    ngOnChanges(changes: SimpleChanges) {
        const { isLoading, hasError, data } = changes;
        console.log('is loading?', isLoading);
        if (!data?.currentValue && !this.skeletonRef) {
            this.skeletonRef = this.vcr.createComponent(SkeletonComponent);
        }
        console.log(this.vcr.element.nativeElement);
        if (isLoading) {
            if (!!isLoading.currentValue) {
                this.loadingRef = this.vcr.createComponent(LoadingComponent);
            } else if (this.loadingRef?.hostView) {
                this.vcr.remove(this.vcr.indexOf(this.loadingRef?.hostView));
            }
        }

        if (!!hasError?.currentValue) {
            this.loadingRef = this.vcr.createComponent(ErrorComponent);
        } else if (this.errorRef?.hostView) {
            this.vcr.remove(this.vcr.indexOf(this.errorRef?.hostView));
        }

        /* this.vcr.clear();

         if (changes.isLoading.currentValue) {
             Array.from({ length: this.size }).forEach(() => {
                 const ref = this.vcr.createComponent(LoadingComponent);

                 Object.assign(ref.instance, {
                     width: this.width === 'rand' ? `${ random(30, 90) }%` : this.width,
                     height: this.height,
                     className: this.className
                 });
             });
         } else {
             this.vcr.createEmbeddedView(this.tpl);
         }

         */
    }
}