import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateMasterDataOfConsultantAdministrator } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UpdateMasterDataOfConsultantAdministratorService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateMasterDataOfConsultantAdministrator';

  constructor(private dataService: DataService<UpdateMasterDataOfConsultantAdministrator>) {
  };

  public getAll(): Observable<UpdateMasterDataOfConsultantAdministrator[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateMasterDataOfConsultantAdministrator> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateMasterDataOfConsultantAdministrator> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateMasterDataOfConsultantAdministrator> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateMasterDataOfConsultantAdministrator> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

