import { Injectable } from '@angular/core';

import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    setCookie('token-trello', token, { expires: 365, path: '/' });
  }

  getToken(): string | undefined {
    return getCookie('token-trello');
  }

  removeToken(): void {
    removeCookie('token-trello');
  }

  saveRefreshToken(token: string): void {
    setCookie('refresh-token-trello', token, { expires: 365, path: '/' });
  }

  getRefreshToken(): string | undefined {
    return getCookie('refresh-token-trello');
  }

  removeRefreshToken(): void {
    removeCookie('refresh-token-trello');
  }
  
  isValidToken(): boolean {
    const token = this.getToken();

    if (!token) return false;

    const decodeToken = jwt_decode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);

      const today = new Date();

      return tokenDate.getTime() > today.getTime();
    }

    return false;
  }

  isValidRefreshToken(): boolean {
    const token = this.getRefreshToken();

    if (!token) return false;

    const decodeToken = jwt_decode<JwtPayload>(token);

    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);

      const today = new Date();

      return tokenDate.getTime() > today.getTime();
    }

    return false;
  }
}
