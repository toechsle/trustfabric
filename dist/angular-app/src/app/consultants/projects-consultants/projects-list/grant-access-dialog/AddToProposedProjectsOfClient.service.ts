import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToProposedProjectsOfClient } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddToProposedProjectsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToProposedProjectsOfClient';

  constructor(private dataService: DataService<AddToProposedProjectsOfClient>) {
  };

  public getAll(): Observable<AddToProposedProjectsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToProposedProjectsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToProposedProjectsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToProposedProjectsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToProposedProjectsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

