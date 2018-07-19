import { Injectable } from '@angular/core';

// ImoNote: 注意这里的写法！
const ls = localStorage;

// ImoNote: 以及这里的写法！
@Injectable({
  providedIn: 'root' // specifies that the service should be provided in the root injector.
})
export class LocalStorageService {
  constructor() {}

  public get<T>(key: string): any {
    return JSON.parse(ls.getItem(key)) as T;
  }

  public getList<T>(key: string) {
    const before = ls.getItem(key);
    return before ? (JSON.parse(before) as T[]) : [];
  }

  public set(key: string, value: any): void {
    if (value === undefined) {
      return;
    }
    const arr = JSON.stringify(value);
    ls.setItem(key, arr);
  }
}
