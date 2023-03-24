import groupBy from 'lodash-es/groupBy';
import uniq from 'lodash-es/uniq';

function UUID() {
    return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c === `x` ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export type Nullable<T> = T | null | undefined;

export enum ClaimData {
    Microservice = 0,
    Entity = 1,
    Action = 2
}

export enum ModuleName {
    ScaleDataManagement = 'Scale Data Management',
    DeviceManagement = 'Device Management',
    WasteManagement = 'Waste Management',
    RecipeManagement = 'Recipe Management',
    ProductionManagement = 'Production Management',
    FreshOrderManagement = 'Fresh Order Management',
    MeatManagement = 'Meat Management',
    TraceabilityManagement = 'Traceability Management'
}

export type  Modules = {
    [name in ModuleName]?: Array<Aggregation>;
}

export enum Entities {
    BusinessUnit = 'business-units',
    BusinessUnitType = 'business-unit-types',
    Zone = 'zones',
    ServiceDepartment = 'service-departments',
    Role = 'roles',
    User = 'users',
    Scale = 'scales',
    Edge = 'edges',
    Device = 'devices',
    Tare = 'tares',
    Barcode = 'barcodes',
    ExtraText = 'extra-texts',
    PLU = 'plus',
    Cool = 'cool',
    CoolShortlist = 'cool-shortlist',
    LabelGraphic = 'label-graphics',
    LabelFormat = 'label-formats',
    Nutrition = 'nutrition',
    NutritionTemplate = 'nutrition-templates',
    Price = 'prices',
    BarcodeAuthorization = 'barcode-authorization',
    LabellingTotals = 'labelling-totals',
    EventBatch = 'event-batches'
}

export const getClaimData = (key: ClaimData) => (p: PermissionDTO): string => p.claim.split('.')[key];

const MODULES: Modules = {
    [ModuleName.ScaleDataManagement]: [
        {
            name: 'Master data',
            entities: [
                Entities.Barcode,
                Entities.Cool,
                Entities.CoolShortlist,
                Entities.ExtraText,
                Entities.LabelGraphic,
                Entities.LabelFormat,
                Entities.Nutrition,
                Entities.NutritionTemplate,
                Entities.Tare,
            ]
        },
        {
            name: 'PLU',
            entities: [
                Entities.PLU,
                Entities.Price,
                Entities.BarcodeAuthorization,
                Entities.LabellingTotals,
                Entities.EventBatch
            ]
        },
        {
            name: 'Business Structure',
            entities: [
                Entities.BusinessUnit,
                Entities.BusinessUnitType,
                Entities.Zone,
                Entities.ServiceDepartment
            ]
        }
    ]
};

export interface PermissionDTO {
    id: string;
    claim: string;
    checked?: boolean;
}

export interface Aggregation {
    name: string;
    entities: Array<Entities>;
}

export const ROLES: Array<RoleDTO> = [
    {
        id: UUID(),
        name: 'Scale Data Mgmt Role',
        module: ModuleName.ScaleDataManagement
    }
];

export interface ActionDescriptor {
    permissionIds?: Array<string>;
    checked?: boolean;
    exists: boolean;
    order: number;
}

export type DistinctActions = string[];

export type RowActions<Actions extends DistinctActions> = {
    [action in Actions[number]]: ActionDescriptor;
}

export interface PermissionTableRow<Actions extends DistinctActions> {
    entityName: Entities;
    actions: RowActions<Actions>;
}

export interface AggregationTableDefinitions<Actions extends DistinctActions> {
    name: string;
    rows: Array<PermissionTableRow<Actions>>;
}

export interface RoleDTO {
    id: string;
    name: string;
    description?: string;
    module: ModuleName;
}

export const getAllModules = (): Array<string> => Object.values(ModuleName);

const CRUD_ACTIONS = ['create', 'delete', 'update', 'read'];

const MICROSERVICES_MAP = new Map<string, Array<string>>([
    ['organizational-structure-management-api', [Entities.BusinessUnit, Entities.BusinessUnitType, Entities.Zone, Entities.ServiceDepartment]],
    ['customer-tenant-management-api', [Entities.Role, Entities.User]],
    ['device-management-api', [Entities.Scale, Entities.Edge, Entities.Device]],
    ['data-management-api', [Entities.Tare, Entities.Barcode, Entities.ExtraText, Entities.PLU, Entities.Cool, Entities.CoolShortlist, Entities.Price,
                             Entities.BarcodeAuthorization, Entities.LabellingTotals, Entities.EventBatch, Entities.LabelFormat,
                             Entities.LabelGraphic]],
    ['nutrition-management-api', [Entities.Nutrition, Entities.NutritionTemplate]]
]);

function generateEntitiesActionsStrings(entities: Array<string>): Array<string> {
    return entities.reduce((acc: Array<string>, entity: string) => {
        return acc.concat(CRUD_ACTIONS.map(action => `${ entity }.${ action }`));
    }, []);
}

/** it generates mock data for permissions **/
export function generatePermissions(replicas: number): Array<PermissionDTO> {
    return Array.from(MICROSERVICES_MAP.entries())
                .reduce((acc: Array<PermissionDTO>, [microservice, entities]: [string, Array<string>]) => {
                    return acc.concat(generateEntitiesActionsStrings(entities)
                        .reduce(
                            (
                                perms: Array<PermissionDTO>,
                                entityAndAction: string
                            ) => [...perms,
                                  ...Array.from({ length: replicas }, () => ({
                                      id: UUID(),
                                      claim: `${ microservice }.${ entityAndAction }`
                                  }))],
                            []
                        ));
                }, [])
                .concat([
                    { id: UUID(), claim: 'device-management-api.devices.install' },
                    { id: UUID(), claim: 'device-management-api.devices.configure' },
                    { id: UUID(), claim: 'data-management-api.plus.load' },
                ]);
}

export function getDistinctActionNames(permissions: Array<PermissionDTO>): Array<string> {
    return uniq(permissions.map(getClaimData(ClaimData.Action)));
}

export const getRoleAggregations = (role: RoleDTO): Array<Aggregation> => MODULES[role.module] as Array<Aggregation>;

export const GENERATED_PERMISSIONS = generatePermissions(8);

export const SELECTED_PERMISSIONS = GENERATED_PERMISSIONS.map((p: PermissionDTO) => ({ ...p, checked: Math.random() < 0.1 }));

interface PermissionsByEntity {
    [entityName: string]: Array<PermissionDTO>;
}

interface PermissionsByEntityAndAction {
    [entityName: string]: {
        [action: string]: Array<PermissionDTO>;
    };
}

export function getPermissionsByEntityAndAction(permissions: Array<PermissionDTO>): PermissionsByEntityAndAction {
    const groupedPermissions: PermissionsByEntity = groupBy(permissions, getClaimData(ClaimData.Entity));
    return Object.entries(groupedPermissions)
                 .reduce((acc, [key, value]: [string, Array<PermissionDTO>]) => {
                     return {
                         ...acc,
                         [key]: groupBy(value, getClaimData(ClaimData.Action))
                     };
                 }, {});
}

export interface AggregationConfig {
    actions: Array<string>;
    permissionsByEntityAndAction: PermissionsByEntityAndAction;
    aggregationsByRole: Array<Aggregation>;
}

export function createAggregationTableDefinitions({
    aggregationsByRole, actions, permissionsByEntityAndAction
}: AggregationConfig): Array<AggregationTableDefinitions<DistinctActions>> {
    return aggregationsByRole.map(({ name, entities }: Aggregation) => ({
        name,
        rows: entities.map((entityName: Entities) => {
            return {
                entityName,
                actions: actions
                    .reduce((acc: RowActions<typeof actions>, action: string) => ({
                            ...acc,
                            [action]: createActionDescriptor(permissionsByEntityAndAction[entityName][action], actions, action)
                        }),
                        {}) as RowActions<typeof actions>
            };
        })
    }));
}

function createActionDescriptor(permissions: Array<PermissionDTO>, availableActions: Array<string>, action: string): ActionDescriptor {
    return {
        checked: permissions?.some(p => p.checked),
        permissionIds: permissions?.map(_ => _.id),
        order: availableActions.findIndex(a => a === action),
        exists: permissions?.length > 0
    };
}

export function formatAggregationTableDefinitions(data: AggregationTableDefinitions<DistinctActions>): Array<string> {
    return data.rows.map((row: PermissionTableRow<DistinctActions>) => row.entityName.padStart(24) + ' | '
        + Object.values(row.actions)
                .sort((valueA: ActionDescriptor, valueB: ActionDescriptor) => valueA.order - valueB.order)
                .map((a: ActionDescriptor) => !!a.exists && !!a.checked ? '[x]' : !!a.exists ? '[ ]' : '')
                .map((str: string) => str.padStart(13))
                .join(' | ')
    );
}
