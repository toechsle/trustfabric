import { Injectable } from '@angular/core';
import { DataService } from '../../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateProjectsOfConsultant } from '../../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UpdateProjectsOfConsultantService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateProjectsOfConsultant';

  constructor(private dataService: DataService<UpdateProjectsOfConsultant>) {
  };

  public getAll(): Observable<UpdateProjectsOfConsultant[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateProjectsOfConsultant> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateProjectsOfConsultant> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateProjectsOfConsultant> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateProjectsOfConsultant> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

