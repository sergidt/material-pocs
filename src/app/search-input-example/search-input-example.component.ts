import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ListItemTemplateDirective, SearchInputListComponent } from './search-input-list/search-input-list.component';
import { SearchableHighlightDirective } from './searchable-highlight.directive';

interface Item {
    property: string;
    value: string;
}

@Component({
    selector: 'app-search-input-example',
    standalone: true,
    imports: [CommonModule, SearchInputListComponent, MatTabsModule, ListItemTemplateDirective, SearchableHighlightDirective],
    template: `
      <h4>Device Pass</h4>

      <mat-tab-group>
        <mat-tab *ngFor="let category of data"
                 [label]="category.name">
          <app-search-input-list [dataProvider]="category.properties"
                                 [filterFn]="customFilterFn">
            <ng-template listItemTmpl
                         let-item>
              <div class="item">
                <span class="label mat-body-2"
                      [searchableHighlight]="toItem(item).property"
                      [title]="item.label"></span>
                <span class="value mat-body-1"
                      [searchableHighlight]="toItem(item).value"
                      [title]="item.value"></span>
              </div>
            </ng-template>
          </app-search-input-list>
        </mat-tab>
      </mat-tab-group>

    `,
    styles: [`
               .item {
                 width: 100%;
                 gap: 20px;
                 display: flex;
                 align-items: baseline;
               }

               .label {
                 width: 600px;
                 cursor: pointer;
                 text-align: left;
               }

               .value {
                 width: 900px;
                 cursor: pointer;
                 text-align: left;
                 white-space: nowrap;
                 overflow: hidden;
                 text-overflow: ellipsis;
               }
             `]
})
export class SearchInputExampleComponent {
    data: Array<{
        name: string;
        properties: Array<Item>;
    }> = [
        {
            name: 'GENERAL',
            properties: [
                {
                    property: 'device identification name',
                    value: 'Bizerba Device Identification',
                },
                { property: 'device identification version', value: '1.03.0021' },
                {
                    property: 'device identification creation date',
                    value: '2017-12-18 23:36:35',
                },
                {
                    property: 'device identification modification date',
                    value: '2017-12-18 23:36:35',
                },
                { property: 'device identification state', value: 'OK' },
                { property: 'device identification errorcode', value: '0' },
                { property: 'device identification time required', value: '11040' },
                { property: 'device number', value: '11463490' },
                { property: 'device name', value: 'Wurst0273527' },
                { property: 'device type', value: 'KHII' },
                { property: 'device description', value: 'KHII 800' },
                { property: 'device model', value: '800' },
                { property: 'device production date', value: '2017-09-28 12:28:22' },
            ],
        },
        {
            name: 'HARDWARE',
            properties: [
                { property: 'board id', value: '1129852977' },
                { property: 'board name', value: 'CX01' },
                { property: 'cpu name', value: 'X86' },
                { property: 'cpu family', value: 'X86' },
                {
                    property: 'cpu description',
                    value: 'Intel(R) Atom(TM) CPU N2800   @ 1.86GHz',
                },
                { property: 'cpu frequence', value: '1860' },
                { property: 'DRAM size', value: '2125615104' },
                { property: 'SRAM size', value: '0' },
                { property: 'EEPROM size', value: '8192' },
                { property: 'BIOS version', value: 'UUP6R908' },
                { property: 'number of mass storage devices', value: '1' },
                { property: 'mass storage size', value: '57239' },
                { property: 'number of displays', value: '2' },
                { property: 'display id', value: '0' },
                { property: 'display id', value: '1' },
                { property: 'display pixel x', value: '800' },
                { property: 'display pixel x', value: '800' },
                { property: 'display pixel y', value: '600' },
                { property: 'display pixel y', value: '600' },
                { property: 'display size x', value: '246' },
                { property: 'display size x', value: '246' },
                { property: 'display size y', value: '184' },
                { property: 'display size y', value: '184' },
                { property: 'display dpi x', value: '82' },
                { property: 'display dpi x', value: '82' },
                { property: 'display dpi y', value: '82' },
                { property: 'display dpi y', value: '82' },
                { property: 'display system dpi x', value: '96' },
                { property: 'display system dpi x', value: '96' },
                { property: 'display system dpi y', value: '96' },
                { property: 'display system dpi y', value: '96' },
                { property: 'local rect left', value: '0' },
                { property: 'local rect left', value: '0' },
                { property: 'local rect top', value: '0' },
                { property: 'local rect top', value: '0' },
                { property: 'local rect right', value: '800' },
                { property: 'local rect right', value: '800' },
                { property: 'local rect bottom', value: '600' },
                { property: 'local rect bottom', value: '600' },
                { property: 'global rect left', value: '0' },
                { property: 'global rect left', value: '800' },
                { property: 'global rect top', value: '0' },
                { property: 'global rect top', value: '600' },
                { property: 'global rect right', value: '800' },
                { property: 'global rect right', value: '1600' },
                { property: 'global rect bottom', value: '600' },
                { property: 'global rect bottom', value: '1200' },
                { property: 'number of printers', value: '1' },
                { property: 'printer id', value: '1' },
                { property: 'printer vendor name', value: 'bizerba' },
                { property: 'printer type', value: 'linerless' },
                { property: 'paper type ticket', value: '1' },
                { property: 'paper type label', value: '0' },
                { property: 'paper type linerless', value: '1' },
                { property: 'paper type linerless blackmark', value: '1' },
                { property: 'printer firmware version', value: '2.16' },
                { property: 'printer dots per line', value: '576' },
                { property: 'printer dots per millimeter', value: '8' },
                { property: 'printer vendor usb id', value: '11B2:0067' },
                { property: 'number of load cells', value: '1' },
                { property: 'load cell program version', value: '0167820424' },
                { property: 'load cell type', value: 'WS18 C6/06 C3MI/06  ' },
                { property: 'load cell number', value: '116534943' },
                { property: 'tilt sensor available', value: '1' },
                { property: 'tilt sensor status', value: '0' },
                { property: 'tilt sensor id', value: '1' },
                { property: 'tilt sensor resolution', value: '4096' },
                { property: 'tilt sensor limit', value: '293' },
            ],
        },
        {
            name: 'OS',
            properties: [
                { property: 'operating system name', value: 'Windows 7 Embedded' },
                { property: 'operating system family', value: 'Windows' },
                { property: 'operating system version', value: '6.1' },
                { property: 'kernel version', value: '6.01.7601' },
                { property: 'image version', value: '5.08.0033' },
                { property: 'BIZHAL version', value: '1.13.0052' },
                { property: 'hostname', value: 'Wurst0273527' },

                { property: 'first dns server', value: '10.15.19.20' },
                { property: 'second dns server', value: '0.0.0.0' },
                { property: 'list of dns servers', value: '10.15.19.20;0.0.0.0' },
                { property: 'number of interfaces', value: '1' },
                { property: 'media type', value: 'ETHERNET' },
                { property: 'DHCP', value: '0' },
                { property: 'ip address', value: '10.211.33.62' },
                { property: 'subnet mask', value: '255.255.255.0' },
                { property: 'gateway', value: '10.211.33.1' },
                { property: 'MAC address', value: '00:E0:4B:5F:96:80' },
            ],
        },
        {
            name: 'SOFTWARE',
            properties: [
                { property: 'number of packages', value: '24' },
                { property: 'package name', value: 'autostart.exe' },
                { property: 'package name', value: 'bizautostartstop' },
                { property: 'package name', value: 'bizdevident' },
                { property: 'package name', value: 'bizretail_python' },

                { property: 'package name', value: 'bosupdcpc.exe' },
                { property: 'package name', value: 'DMRClient' },
                { property: 'package name', value: 'firebird' },
                { property: 'package name', value: 'homepage' },
                { property: 'package name', value: 'RetailImpactSpot' },
                { property: 'package name', value: 'Java VM' },
                { property: 'package name', value: 'ossupportpack' },
                { property: 'package name', value: 'prndriver' },
                { property: 'package name', value: 'remctrl.exe' },
                { property: 'package name', value: 'RetailDeviceServer' },
                { property: 'package name', value: 'RetailConnect' },
                { property: 'package name', value: 'RE Batchprinting' },
                { property: 'package name', value: 'rmc' },
                { property: 'package name', value: 'bizretail_rmcscripts' },
                { property: 'package name', value: 'UninstallDisplayEngine' },
                { property: 'package name', value: 'update.exe' },
                { property: 'package name', value: 'usbmedia' },
                { property: 'package name', value: 'PowerScale 61996100261' },
                { property: 'package name', value: 'unitouch DE_de' },
                { property: 'package version', value: 'v1.05' },
                { property: 'package version', value: '1.02' },
                { property: 'package version', value: '1.03' },
                { property: 'package version', value: '3.33' },
                { property: 'package version', value: '3.33' },
                { property: 'package version', value: 'v1.00' },
                { property: 'package version', value: '0.01' },
                { property: 'package version', value: '2.17' },
                { property: 'package version', value: 'v1.04' },
                { property: 'package version', value: '2.01.238.50362' },
                { property: 'package version', value: '1.13' },
                { property: 'package version', value: '1.15' },
                { property: 'package version', value: '5.57' },
                { property: 'package version', value: 'v4.21' },
                { property: 'package version', value: '2.21' },
                { property: 'package version', value: 'v1.76.1015' },
                { property: 'package version', value: '2.50' },
                { property: 'package version', value: '2.05' },
                { property: 'package version', value: '1.76' },
                { property: 'package version', value: '0.01' },
                { property: 'package version', value: 'v8.55' },
                { property: 'package version', value: '2.60' },
                { property: 'package version', value: '2.61' },
                { property: 'package version', value: '2.61' },
                { property: 'package build', value: '-' },
                { property: 'package build', value: '0000' },
                { property: 'package build', value: '0021' },
                { property: 'package build', value: '0004' },
                { property: 'package build', value: '0004' },
                { property: 'package build', value: '-' },
                { property: 'package build', value: 'build.0009' },
                { property: 'package build', value: '0001' },
                { property: 'package build', value: 'b0010' },
                { property: 'package build', value: 'build.1' },
                { property: 'package build', value: '0001' },
                { property: 'package build', value: '0000' },
                { property: 'package build', value: '0000' },
                { property: 'package build', value: 'b0008' },
                { property: 'package build', value: '0005' },
                { property: 'package build', value: '-' },
                { property: 'package build', value: 'build.02' },
                { property: 'package build', value: 'build.02' },
                { property: 'package build', value: '0001' },
                { property: 'package build', value: 'build.0001' },
                { property: 'package build', value: 'b0032' },
                { property: 'package build', value: 'build.11' },
                { property: 'package build', value: 'build.4' },
                { property: 'package build', value: 'build.5' },
                { property: 'package date', value: '27.04.2007' },
                { property: 'package date', value: '26.02.2014' },
                { property: 'package date', value: '21.03.2014' },
                { property: 'package date', value: '2017-07-07' },
                { property: 'package date', value: '2017-07-07' },
                { property: 'package date', value: '16.01.2012' },
                { property: 'package date', value: '13.03.2017' },
                { property: 'package date', value: '2017-08-25' },
                { property: 'package date', value: '20.10.2014' },
                { property: 'package date', value: '14.06.2013' },
                { property: 'package date', value: '2017-05-02' },
                { property: 'package date', value: '26.02.2014' },
                { property: 'package date', value: '29.04.2014' },
                { property: 'package date', value: '01.12.2014' },
                { property: 'package date', value: '2017-10-08' },
                { property: 'package date', value: '19.03.2014' },
                { property: 'package date', value: '05.09.2013' },
                { property: 'package date', value: '09.05.2017' },
                { property: 'package date', value: '2017-07-25' },
                { property: 'package date', value: '18.11.2016' },
                { property: 'package date', value: '25.03.2015' },
                { property: 'package date', value: '02.04.2014' },
                { property: 'package date', value: '10.04.2014' },
                { property: 'package date', value: '10.04.2014' },
                { property: 'package description', value: 'Bizerba Autostart Program' },
                { property: 'package description', value: 'bizautostartstop ' },
                {
                    property: 'package description',
                    value: 'Bizerba Device Identification for Windows',
                },
                { property: 'package description', value: 'Python interpreter' },
                { property: 'package description', value: 'Python interpreter' },
                { property: 'package description', value: 'BOSUPD CmpPipe Client' },
                {
                    property: 'package description',
                    value: 'Installationspaket fÃƒÂ¼r OSE DMRClient',
                },
                {
                    property: 'package description',
                    value: 'Firebird Database Server 2.17_V1.7.5.6120 for Windows',
                },
                { property: 'package description', value: 'K-class Homepage' },
                { property: 'package description', value: 'Bizerba .Retail Impact Spot' },
                {
                    property: 'package description',
                    value: 'Oracle Java VM jre-7u65-windows-i586.exe ',
                },
                { property: 'package description', value: 'os-support pack ' },
                { property: 'package description', value: 'Printer package ' },
                { property: 'package description', value: 'Remote Control GUI Server' },
                {
                    property: 'package description',
                    value: 'Bizerba Retail Device Server Package',
                },
                { property: 'package description', value: '.RetailConnect' },
                {
                    property: 'package description',
                    value: 'handles printing of multi tickets for multi PLUs',
                },
                { property: 'package description', value: 'RetailManagement-Console' },
                {
                    property: 'package description',
                    value: 'Scripts for Retail Management Console',
                },
                {
                    property: 'package description',
                    value: 'Uninstallpaket fÃƒÂ¼r Online DisplayEngine',
                },
                { property: 'package description', value: 'Software Update Manager' },
                { property: 'package description', value: 'USB Media Tool' },
                { property: 'package description', value: 'Retail PowerScale package ' },
                {
                    property: 'package description',
                    value: 'Retail PowerScale profiles package ',
                },
            ],
        },
        {
            name: 'LICENSES',
            properties: [
                { property: 'BSL available', value: '0' },
                { property: 'BSP available', value: '1' },
                { property: 'BSP server', value: '127.0.0.1' },
                { property: 'BSP server version', value: '8.5.2.15' },
                { property: 'number of features', value: '8' },
                { property: 'feature name', value: 'CS_MC_RS_Update' },
                { property: 'feature name', value: 'RS_Connect_ContentExt' },
                { property: 'feature name', value: 'RS_K_BranchReturn' },
                { property: 'feature name', value: 'RS_K_HostInterface' },
                { property: 'feature name', value: 'RS_K_Inventory' },
                { property: 'feature name', value: 'RS_K_JAVAPRODUCTION1_7' },
                { property: 'feature name', value: 'RS_K_Traceability' },
                { property: 'feature name', value: 'RS_K_Waste' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'max', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'free', value: '1' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'used', value: '0' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'expiration date', value: '-1' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'unbound', value: '0' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'device id', value: '11463490' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
                { property: 'activation code', value: 'CSYDS8M5' },
            ],
        },
        {
            name: 'APPLICATION',
            properties: [
                { property: 'scale interval', value: 'e  =    2/5 g ' },
                { property: 'scale weighing range', value: 'Max   6/15 kg ' },
                { property: 'scale minimal load capacity', value: 'Min      40 g ' },
                { property: 'g factor', value: '-0,34 g/kg' },
                { property: 'working load code', value: '150502' },
                { property: 'welmec Version', value: '008' },
                { property: 'welmec ID', value: '2848' },
                { property: 'active keyboard project', value: 'unitouch' },
                { property: 'active keyboard color style', value: 'red_cold' },
                { property: 'active global variation', value: '---' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '100' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '104' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '0' },
                { property: 'handler viewport id', value: '104' },
                { property: 'handler id', value: 'QS' },
                { property: 'handler id', value: 'ORDER' },
                { property: 'handler id', value: 'QS_SS' },
                { property: 'handler id', value: 'AS' },
                { property: 'handler id', value: 'AS' },
                { property: 'handler id', value: 'AS' },
                { property: 'handler id', value: 'POSH' },
                { property: 'handler id', value: 'STOCK' },
                { property: 'handler id', value: 'STOCK' },
                { property: 'current handler variation', value: '---' },
                { property: 'current handler variation', value: '---' },
                { property: 'current handler variation', value: '---' },
                { property: 'current handler variation', value: '---' },
                { property: 'current handler variation', value: '3_edeka_wurst_emma_lunar' },
                {
                    property: 'current handler variation',
                    value: 'onlineprestige_800x138_cs_top_as',
                },
                { property: 'current handler variation', value: '---' },
                {
                    property: 'current handler variation',
                    value: '3_edeka_wurst_inventur_lunar',
                },
                {
                    property: 'current handler variation',
                    value: 'onlineprestige_800x138_cs_top_stock',
                },
            ],
        },
    ];

    toItem(i: Item): Item {
        return i;
    }

    customFilterFn = (item: { property: string; value: string }, term: string) => `${ item.property } ${ item.value }`.toLowerCase()
                                                                                                                      .includes(term.toLowerCase());

}
