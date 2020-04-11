import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ClientUpdateService {
   
    private listOfClientsChanged = new Subject();
    listOfClientsChanged$ = this.listOfClientsChanged.asObservable();

    clientAdded() {
        this.listOfClientsChanged.next();
    }

}