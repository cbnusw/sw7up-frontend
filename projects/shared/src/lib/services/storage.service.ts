import { Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

export const REFRESH_TOKEN_KEY = 'refresh-token';
export const ACCESS_TOKEN_KEY = 'access-token';
export const REDIRECT_URL_KEY = 'redirect-url';

export const REQUEST_SHARE_TOKEN_EVENT = 'REQUEST_SHARE_TOKEN';
export const TOKEN_SHARE_EVENT = 'TOKEN_SHARE';
export const TOKEN_FLUSH_EVENT = 'TOKEN_FLUSH';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor(private platform: PlatformService) {
    this.init();
  }

  set redirectUrl(url: string) {
    this.set(REDIRECT_URL_KEY, url);
  }

  get redirectUrl(): string {
    const url: string = this.get(REDIRECT_URL_KEY);
    this.remove(REDIRECT_URL_KEY);
    return url;
  }

  get<R>(key: string): R {
    if (this.platform.isBrowser) {
      const value = this.storage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    }
  }

  set<T>(key: string, value: T): void {
    if (this.platform.isBrowser) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  }

  remove(key: string): void {
    if (this.platform.isBrowser) {
      this.storage.removeItem(key);
    }
  }

  clear(): void {
    if (this.platform.isBrowser) {
      this.storage.clear();
    }
  }

  emit(name: string, data?: any): void {
    if (this.platform.isBrowser) {
      localStorage.setItem(name, JSON.stringify(data || null));
      localStorage.removeItem(name);
    }
  }

  private init(): void {
    if (this.platform.isBrowser) {
      this.storage = sessionStorage;
      window.addEventListener('storage', (event: StorageEvent) => {
        const refreshToken = this.get(REFRESH_TOKEN_KEY);
        const accessToken = this.get(ACCESS_TOKEN_KEY);

        if (event.key === REQUEST_SHARE_TOKEN_EVENT && refreshToken && accessToken) {
          this.emit(TOKEN_SHARE_EVENT, { accessToken, refreshToken });
        } else if (event.key === TOKEN_SHARE_EVENT && !(refreshToken || accessToken)) {
          const data = JSON.parse(event.newValue);
          this.set(REFRESH_TOKEN_KEY, data.refreshToken);
          this.set(ACCESS_TOKEN_KEY, data.accessToken);
          location.reload();
        } else if (event.key === TOKEN_FLUSH_EVENT) {
          this.clear();
        }
      }, false);
      this.emit(REQUEST_SHARE_TOKEN_EVENT);
    }
  }
}
