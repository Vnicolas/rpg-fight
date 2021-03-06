import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() {
    if (!window.localStorage) {
      console.warn('localStorage is not avalaible, this site will not work as expected.')
    }
  }

  getItem(itemName: string, parse = false): any {
    if (parse && localStorage.getItem(itemName)) {
      return JSON.parse(localStorage.getItem(itemName) || '');
    } else {
      return localStorage.getItem(itemName);
    }
  }

  setItem(itemName: string, itemValue: any, stringify = false): void {
    if (stringify) {
      localStorage.setItem(itemName, JSON.stringify(itemValue));
    } else {
      localStorage.setItem(itemName, itemValue);
    }
  }

  removeItem(itemName: string): void {
    localStorage.removeItem(itemName);
  }
}
