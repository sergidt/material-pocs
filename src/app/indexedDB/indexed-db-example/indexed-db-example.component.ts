import { CommonModule } from '@angular/common';
import { Component, inject, Injectable } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { AppDB, Role, Roles, User, UUID } from './db';

@Component({
    selector: 'app-indexed-db-example',
    standalone: true,
    imports: [CommonModule, MatCardModule,
              MatFormFieldModule, MatInputModule,
              MatSelectModule, ReactiveFormsModule,
              MatButtonModule, MatListModule,
              MatIconModule],
    template: `
      <mat-list class="list">
        <mat-list-item *ngFor="let user of users$ | async">
          {{user.name}}
          <button mat-icon-button
                  (click)="deleteUser(user)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>

      <mat-card>
        <mat-card-title>New User</mat-card-title>
        <form [formGroup]="formGroup">
          <mat-card-content class="card-content">
            <mat-form-field color="primary">
              <mat-label>Name</mat-label>
              <input matInput
                     formControlName="name"/>
            </mat-form-field>
            <mat-form-field color="primary">
              <mat-label>Age</mat-label>
              <input matInput
                     formControlName="age"
                     type="number"/>
            </mat-form-field>

            <mat-form-field color="primary">
              <mat-label>Role</mat-label>
              <mat-select
                  formControlName="role">
                <mat-option *ngFor="let role of roles$ | async"
                            [value]="role.name">{{role.name}}</mat-option>
              </mat-select>
            </mat-form-field>
            <button mat-raised-button
                    (click)="createUser()">Create
            </button>
          </mat-card-content>
        </form>
      </mat-card>
    `,
    styleUrls: ['./indexed-db-example.component.scss']
})
export class IndexedDBExampleComponent {
    fb = inject<NonNullableFormBuilder>(NonNullableFormBuilder);
    formGroup: FormGroup = this.fb.group<{ [key in keyof Omit<User, 'id'>]: User[key] }>({
        name: '',
        age: 18,
        role: Roles.User
    });

    private service = inject(UserService);
    users$ = this.service.getAllUsers();
    roles$ = this.service.getAllRoles();

    createUser() {
        this.service.upsertUser(this.formGroup.getRawValue());
    }

    deleteUser(user: User) {
        user.id && this.service.deleteUser(user.id);
    }
}

@Injectable({ providedIn: 'root' })
class UserService {
    private _DB = new AppDB();

    getAllUsers = () => this._DB.getUsers$();

    getAllRoles(): Observable<Array<Role>> {
        return this._DB.getRoles$();
    }

    getUserById(id: string) {//: Observable<User> {

    }

    upsertUser(user: User) {
        const id = UUID();
        this._DB.users.add({ ...user, id }, id);
    }

    deleteUser(userId: string) {
        this._DB.users.delete(userId);
    }
}