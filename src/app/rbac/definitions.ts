export interface AccessRole {
    roles: string[];
    operator?: 'AND' | 'OR';
}

export const AND_ROLES_OPERATOR: AccessRole = {
    roles: ['admin', 'user', 'imposter'],
};

export const OR_ROLES_OPERATOR: AccessRole = {
    roles: ['admin', 'user', 'imposter'],
    operator: 'OR',
};