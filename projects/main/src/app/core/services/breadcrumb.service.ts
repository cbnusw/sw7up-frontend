import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbItems: string[] = [];

  constructor() { }

  set items(items: string[]) {
    this.breadcrumbItems = items || [];
  }

  get items(): string[] {
    return this.breadcrumbItems;
  }

  clear(): void {
    this.breadcrumbItems = [];
  }
}
