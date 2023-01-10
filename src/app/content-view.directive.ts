import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[contentView]',
  standalone: true
})
export class ContentViewDirective {

  constructor(public tmpl: TemplateRef<any>) { }

}
