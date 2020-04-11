import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ConsultantUpdateService {
   
    private listOfConsultantsChanged = new Subject();
    listOfConsultantsChanged$ = this.listOfConsultantsChanged.asObservable();

    consultantAdded() {
        this.listOfConsultantsChanged.next();
    }

}