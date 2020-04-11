import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class CompaniesUpdateService {

  private listOfCompaniesChanged = new Subject();
  listOfCompaniesChanged$ = this.listOfCompaniesChanged.asObservable();

  companyAdded() {
      this.listOfCompaniesChanged.next();
  }

}
