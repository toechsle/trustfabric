import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SkillsUpdateClientService {

  private listOfSkillsChanged = new Subject();
  listOfSkillsChanged$ = this.listOfSkillsChanged.asObservable();

  skillsUpdated() {
      this.listOfSkillsChanged.next();
  }

}
