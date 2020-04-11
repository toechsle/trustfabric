import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ClientAdministratorUpdateService {

  private listOfClientAdministratorsChanged = new Subject();
  listOfClientAdministratorsChanged$ = this.listOfClientAdministratorsChanged.asObservable();

  clientAdminAdded() {
      this.listOfClientAdministratorsChanged.next();
  }

}
