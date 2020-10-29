import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private textSource = new BehaviorSubject('');
  currentText = this.textSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.textSource.next(message);
  }
}
