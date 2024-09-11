import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { API_URL } from "./config";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CookieService } from "ngx-cookie-service";

interface LoginServiceResponse {
  token: string | null,
  error: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)

  token: string | null = null
  error: string | null = null

  isAuth: boolean = false

  private dataSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth);
  isAuth$: Observable<boolean> = this.dataSubject.asObservable();
  setIsAuth(newValue: boolean) {
    this.dataSubject.next(newValue);
  }

  get checkIsAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token')
    }
    this.isAuth = !!this.token
    this.setIsAuth(this.isAuth)
    return this.isAuth
  }

  login(payload: { email: string, password: string }) {
    return this.http.post<LoginServiceResponse>(`${API_URL}login`, payload)
      .pipe(
        tap((res: LoginServiceResponse) => {
          if (res.error) {
            this.error = res.error
          }
          this.token = res.token
          if (!!this.token) {
            this.cookieService.set('token', this.token)
            this.isAuth = true
            this.setIsAuth(true)
          }
        })
      )
  }

  logout() {
    this.token = null
    this.cookieService.delete('token')
    this.isAuth = false
    this.setIsAuth(false)
  }
}
