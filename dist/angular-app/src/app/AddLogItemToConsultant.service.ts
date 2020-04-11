import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { AddLogItemToConsultant } from './org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddLogItemToConsultantService {

  private NAMESPACE = 'org.ifb.trustfabric.AddLogItemToConsultant';

  constructor(private dataService: DataService<AddLogItemToConsultant>) {
  };

  public getAll(): Observable<AddLogItemToConsultant[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddLogItemToConsultant> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddLogItemToConsultant> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddLogItemToConsultant> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddLogItemToConsultant> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

