function UUID() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c === `x` ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export interface PermissionDTO {
    id: string;
    claim: string;
}

export interface Aggregation {
    name: string;
    entities: Array<string>;
}

export interface Module {
    name: string;
    aggregations: Array<Aggregation>
}


const CRUD_ACTIONS = ['create', 'delete', 'update', 'read'];

const microservicesMap = new Map<string, Array<string>>([
    ['master-tenant-management-api', ['tenant', 'user', 'tenant-module']],
    ['organizational-structure-management-api', ['business-units', 'business-unit-types', 'zones', 'service-departments']],
    ['customer-tenant-management-api', ['roles', 'users']],
    ['device-management-api', ['scales', 'edges', 'devices']],
    ['data-management-api', ['tares', 'barcodes', 'extra-texts', 'plu']],
    ['label-management-api', ['label-graphics', 'label-formats']],
    ['nutrition-management-api', ['nutritions', 'nutrition-values', 'nutrition-templates']]
]);

const moduleAggregationsConfig: Module =
    {
        name: 'SDM',
        aggregations: [
            {
                name: 'Label',
                entities: ['label-graphics','label-formats']
            },
            {
                name: 'PLU',
                entities: ['plu','barcodes','tares']
            },
        ]
    };

export function getAllRoles(): Array<PermissionDTO> {
    return Array.from(microservicesMap.entries())
                .reduce((acc: Array<PermissionDTO>, [microservice, entities]: [string, Array<string>]) => {

                    const entitiesCrudActions = entities.reduce((acc: Array<string>, entity: string) => {
                        return acc.concat(CRUD_ACTIONS.map(action => `${ entity }.${ action }`));
                    }, []);

                    return acc.concat(
                        entitiesCrudActions.map((entityAndAction: string) => ({ id: UUID(), claim: `${ microservice }.${ entityAndAction }` }))
                    );
                }, []);
}
