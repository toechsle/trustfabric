import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateMasterDataOfClientAdministrator } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UpdateMasterDataOfClientAdministratorService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateMasterDataOfClientAdministrator';

  constructor(private dataService: DataService<UpdateMasterDataOfClientAdministrator>) {
  };

  public getAll(): Observable<UpdateMasterDataOfClientAdministrator[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateMasterDataOfClientAdministrator> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateMasterDataOfClientAdministrator> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateMasterDataOfClientAdministrator> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateMasterDataOfClientAdministrator> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

