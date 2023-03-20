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

const PERMISSIONS: Array<PermissionDTO> = [
    {
        id: '939f68f1-049e-4d93-9a4d-65af7d669b02',
        claim: 'organizational-structure-management-api.business-units.read',
    },
    {
        id: '2f814e3a-6231-4389-b7ab-3a90d3e39da9',
        claim: 'organizational-structure-management-api.business-units.delete',
    },
    {
        id: '9aa2e874-ab74-4e88-b083-09448af3f309',
        claim: 'organizational-structure-management-api.business-units.read',
    },
    {
        id: '7fe02c72-e627-4888-9571-3f108ca7d85e',
        claim: 'organizational-structure-management-api.business-units.read',
    },
    {
        id: '799c2572-6dab-459a-8713-9a4be2bf9c20',
        claim: 'organizational-structure-management-api.business-units.create',
    },
    {
        id: '24fa3479-51b9-4ff1-959a-f9821fcf0afc',
        claim: 'organizational-structure-management-api.business-units.update',
    },
    {
        id: '939f68f1-049e-4d93-9a4d-65af7d669b02',
        claim: 'organizational-structure-management-api.business-units.read'
    },
    {
        id: '2f814e3a-6231-4389-b7ab-3a90d3e39da9',
        claim: 'organizational-structure-management-api.business-units.delete'
    },
    {
        id: '9aa2e874-ab74-4e88-b083-09448af3f309',
        claim: 'organizational-structure-management-api.business-units.read'
    },
    {
        id: '7fe02c72-e627-4888-9571-3f108ca7d85e',
        claim: 'organizational-structure-management-api.business-units.read'
    },
    {
        id: '799c2572-6dab-459a-8713-9a4be2bf9c20',
        claim: 'organizational-structure-management-api.business-units.create'
    },
    {
        id: '24fa3479-51b9-4ff1-959a-f9821fcf0afc',
        claim: 'organizational-structure-management-api.business-units.update'
    }
];

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
