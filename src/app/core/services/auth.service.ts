import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {catchError, of} from 'rxjs';
import {IAuthResponse} from '../interface/auth/authorization.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private _isAuthenticated = signal<boolean>(false);

  isAuthenticated = computed(() => this._isAuthenticated());

  login() {
    this.http
      .get<IAuthResponse>(`${environment.apiUrl}/authentication`)
      .pipe(catchError(() => of({ success: false })))
      .subscribe((response) => {
        this._isAuthenticated.set(response.success);
      });
  }

}
