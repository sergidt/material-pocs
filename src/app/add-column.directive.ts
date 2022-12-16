import { CdkColumnDef, CdkHeaderCellDef, CdkTable } from '@angular/cdk/table';
import { AfterViewInit, Component, Directive, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  template: `
  <ng-template>
  <ng-container matColumnDef="weight">
  <th mat-header-cell *matHeaderCellDef> Weight </th>
  <td mat-cell *matCellDef="let element"> 1</td>
</ng-container>
  </ng-template>`,
})
export class ActionsComponent {
@ViewChild(TemplateRef) template!: TemplateRef<any>;
}

@Directive({
  selector: '[addColumn]',
})
export class AddColumnDirective implements OnInit {
private readonly table: MatTable<any>;

 constructor( {nativeElement}: ElementRef){
 this.table = nativeElement;
 }

 ngOnInit() {
 console.log(this.table);
/*
 const comp = new ActionsComponent();
 

const column = new CdkColumnDef(this.table);
column.headerCell = new CdkHeaderCellDef(comp.template);

 (this.table as CdkTable<any>).addColumnDef(column);
 */
  }

}
