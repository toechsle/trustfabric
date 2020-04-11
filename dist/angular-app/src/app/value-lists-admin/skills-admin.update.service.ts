import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class SkillUpdateService {
   
    private listOfSkillsChanged = new Subject();
    listOfSkillsChanged$ = this.listOfSkillsChanged.asObservable();

    skillAdded() {
        this.listOfSkillsChanged.next();
    }

}