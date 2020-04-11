import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ConsultantAdministratorUpdateService {
   
    private listOfConsultantAdministratorsChanged = new Subject();
    listOfConsultantAdministratorsChanged$ = this.listOfConsultantAdministratorsChanged.asObservable();

    consultantAdminAdded() {
        this.listOfConsultantAdministratorsChanged.next();
    }

}