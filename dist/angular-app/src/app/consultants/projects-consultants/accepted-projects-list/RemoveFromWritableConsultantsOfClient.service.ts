import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromWritableConsultantsOfClient } from '../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveFromWritableConsultantsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromWritableConsultantsOfClient';

  constructor(private dataService: DataService<RemoveFromWritableConsultantsOfClient>) {
  };

  public getAll(): Observable<RemoveFromWritableConsultantsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromWritableConsultantsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromWritableConsultantsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromWritableConsultantsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromWritableConsultantsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

