import { Component, OnInit } from '@angular/core';
import {
    AggregationConfig, createAggregationTableDefinitions, formatAggregationTableDefinitions, getAllModules, getDistinctActionNames,
    getPermissionsByEntityAndAction, getRoleAggregations, ROLES, SELECTED_PERMISSIONS
} from './utils';

@Component({
    selector: 'app-roles-permissions',
    standalone: true,
    template: `
      <h4>Roles and permissions</h4>
    `,
    styles: [`
             `]
})
export class RolesAndPermissionsComponent implements OnInit {
    ngOnInit() {
        console.clear();

        console.log('Modules:', getAllModules());

        console.log(SELECTED_PERMISSIONS);

        const distinctActions = getDistinctActionNames(SELECTED_PERMISSIONS);

        const headers = ['                        '].concat(distinctActions.map(actionName => actionName.padStart(13))).join(' | ');

        const config: AggregationConfig = {
            actions: distinctActions,
            aggregationsByRole: getRoleAggregations(ROLES[0]),
            permissionsByEntityAndAction: getPermissionsByEntityAndAction(SELECTED_PERMISSIONS)
        };

        console.time('Generate Aggregation Table Definitions');

        const data = createAggregationTableDefinitions(config);
        console.timeEnd('Generate Aggregation Table Definitions');

        console.log(data);

        data.forEach(agg => {
            console.log('\n' + agg.name + '\n=====================================================================================================================================================\n\n');
            console.log(headers);
            const rows = formatAggregationTableDefinitions(agg);
            console.log(rows.join('\n'));
            console.log('\n\n');
        });

    }
}
