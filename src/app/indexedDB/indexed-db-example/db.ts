import Dexie, { liveQuery, Table } from 'dexie';
import { Observable } from 'rxjs';

export enum Roles {
    Admin = 'Admin',
    SystemAdmin = 'SystemAdmin',
    User = 'User'
}

export interface Role {
    name: Roles;
    description: string;
}

export interface User {
    id?: string;
    name: string;
    age: number;
    role: Roles;
}

export const UUID = () => `${ Math.random().toString() }-${ Math.random().toString() }`;

export class AppDB extends Dexie {
    users!: Table<User, string>;
    roles!: Table<Role, Roles>;

    constructor() {
        super('mock-database');

        this.version(3).stores({
            users: '&id, name, age, role',
            roles: '&name, description',
        });
        this.on('populate', () => this.populate());
    }

    async populate() {
        const rolesResponse = await this.roles.bulkAdd([{
            name: Roles.Admin,
            description: 'Administrator'
        },
            {
                name: Roles.User,
                description: 'Plain User'
            },
            {
                name: Roles.SystemAdmin,
                description: 'System Administrator'
            }]);

        console.log('rolesResponse', rolesResponse);

        await this.users.bulkAdd([
            {
                id: UUID(),
                age: parseInt(`${ Math.max(18, Math.random() * 60) }`),
                role: Roles.Admin,
                name: 'Alejandro Riera',
            },
            {
                id: UUID(),
                age: parseInt(`${ Math.max(18, Math.random() * 60) }`),
                role: Roles.SystemAdmin,
                name: 'Sergi Varea',
            },
            {
                id: UUID(),
                age: parseInt(`${ Math.max(18, Math.random() * 60) }`),
                role: Roles.User,
                name: 'Sergi Dote',
            }
        ]);
    }

    async resetDatabase() {
        await this.transaction('rw', 'users', 'roles', () => {
            this.users.clear();
            this.roles.clear();
            this.populate();
        });
    }

    getUsers$(): Observable<Array<User>> {
        return this.getRealtimeRecords$(this.users);
    }

    getRoles$(): Observable<Array<Role>> {
        return this.getRealtimeRecords$(this.roles);
    }

    getRealtimeRecords$<T>(table: Table<T>): Observable<Array<T>> {
        return new Observable<Array<T>>(subscriber => {
            const subscription = liveQuery(() => table.toArray()).subscribe({
                next: _ => subscriber.next(_),
                error: (err: unknown) => subscriber.error(err),
                complete: () => subscriber.complete(),
            });
            return () => {
                subscription.unsubscribe();
            };
        });
    }
}
