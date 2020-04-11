import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToReadableConsultantsOfClient } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddToReadableConsultantsOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToReadableConsultantsOfClient';

  constructor(private dataService: DataService<AddToReadableConsultantsOfClient>) {
  };

  public getAll(): Observable<AddToReadableConsultantsOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToReadableConsultantsOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToReadableConsultantsOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToReadableConsultantsOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToReadableConsultantsOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

