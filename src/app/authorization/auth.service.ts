import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _userRights: Array<string> = [];

    hasRight = (right: string) => this._userRights.some(_ => _ === right);

    setUserRights(rights: Array<string>) {
        this._userRights = rights || [];
    }
}
