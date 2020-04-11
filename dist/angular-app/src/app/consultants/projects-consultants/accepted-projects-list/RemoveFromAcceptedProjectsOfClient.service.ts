import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromAcceptedProjectsOfClient } from '../../../org.ifb.trustfabric';
import 'rxjs/Rx';


// Can be injected into a constructor
@Injectable()
export class RemoveFromAcceptedProjectsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromAcceptedProjectsOfClient';

  constructor(private dataService: DataService<RemoveFromAcceptedProjectsOfClient>) {
  };

  public getAll(): Observable<RemoveFromAcceptedProjectsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromAcceptedProjectsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromAcceptedProjectsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromAcceptedProjectsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromAcceptedProjectsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

