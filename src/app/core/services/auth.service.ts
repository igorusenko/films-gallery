import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {catchError, map, Observable, of} from 'rxjs';
import {IAuthResponse} from '../interface/auth/authorization.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private _isAuthenticated = signal<boolean>(false);

  get isAuthenticated(): boolean {
    return this._isAuthenticated();
  }

  constructor() {
    this.login();
  }

  login(): Observable<boolean> {
    return this.http
        .get<{ success: boolean }>(`${environment.apiUrl}/authentication`)
        .pipe(
            catchError(() => of({ success: false })),
            map(response => {
              this._isAuthenticated.set(response.success);
              return response.success;
            })
        );
  }

}
