import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToAcceptedProjectsOfClient } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddToAcceptedProjectsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToAcceptedProjectsOfClient';

  constructor(private dataService: DataService<AddToAcceptedProjectsOfClient>) {
  };

  public getAll(): Observable<AddToAcceptedProjectsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToAcceptedProjectsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToAcceptedProjectsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToAcceptedProjectsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToAcceptedProjectsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

