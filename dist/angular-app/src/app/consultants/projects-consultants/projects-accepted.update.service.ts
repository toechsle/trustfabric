import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class AcceptedProjectUpdateService {
   
    private listOfAcceptedProjectsChanged = new Subject();
    listOfAcceptedProjectsChanged$ = this.listOfAcceptedProjectsChanged.asObservable();

    acceptedProjectsUpdated() {
        this.listOfAcceptedProjectsChanged.next();
    }

}