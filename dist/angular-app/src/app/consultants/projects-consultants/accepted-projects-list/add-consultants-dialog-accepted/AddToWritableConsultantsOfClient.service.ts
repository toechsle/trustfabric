import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToWritableConsultantsOfClient } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddToWritableConsultantsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToWritableConsultantsOfClient';

  constructor(private dataService: DataService<AddToWritableConsultantsOfClient>) {
  };

  public getAll(): Observable<AddToWritableConsultantsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToWritableConsultantsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToWritableConsultantsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToWritableConsultantsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToWritableConsultantsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

