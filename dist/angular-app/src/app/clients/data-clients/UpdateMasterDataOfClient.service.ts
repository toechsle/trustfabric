import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateMasterDataOfClient } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UpdateMasterDataOfClientService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateMasterDataOfClient';

  constructor(private dataService: DataService<UpdateMasterDataOfClient>) {
  };

  public getAll(): Observable<UpdateMasterDataOfClient[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateMasterDataOfClient> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateMasterDataOfClient> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateMasterDataOfClient> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateMasterDataOfClient> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

