import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ProjectsUpdateClientService {

  private listOfProjectsChanged = new Subject();
  listOfProjectsChanged$ = this.listOfProjectsChanged.asObservable();

  projectsUpdated() {
      this.listOfProjectsChanged.next();
  }

}
