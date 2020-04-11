import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ProposedProjectUpdateService {
   
    private listOfProposedProjectsChanged = new Subject();
    listOfProposedProjectsChanged$ = this.listOfProposedProjectsChanged.asObservable();

    proposedProjectsUpdated() {
        this.listOfProposedProjectsChanged.next();
    }

}