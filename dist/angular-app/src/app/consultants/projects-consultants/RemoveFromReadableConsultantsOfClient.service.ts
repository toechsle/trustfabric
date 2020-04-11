import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromReadableConsultantsOfClient } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveFromReadableConsultantsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromReadableConsultantsOfClient';

  constructor(private dataService: DataService<RemoveFromReadableConsultantsOfClient>) {
  };

  public getAll(): Observable<RemoveFromReadableConsultantsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromReadableConsultantsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromReadableConsultantsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromReadableConsultantsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromReadableConsultantsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

