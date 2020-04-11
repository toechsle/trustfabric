import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromProposedProjectsOfClient } from '../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveFromProposedProjectsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromProposedProjectsOfClient';

  constructor(private dataService: DataService<RemoveFromProposedProjectsOfClient>) {
  };

  public getAll(): Observable<RemoveFromProposedProjectsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromProposedProjectsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromProposedProjectsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromProposedProjectsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromProposedProjectsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

