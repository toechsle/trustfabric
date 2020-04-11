import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class AdminClientUpdatePersonalDataService {

  private personalDataUpdated = new Subject();
  personalDataUpdated$ = this.personalDataUpdated.asObservable();

  dataUpdated() {
      this.personalDataUpdated.next();
  }



}