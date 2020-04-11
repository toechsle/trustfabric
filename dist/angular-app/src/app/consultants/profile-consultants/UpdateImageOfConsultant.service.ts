import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateImageOfConsultant } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';



// Can be injected into a constructor
@Injectable()
export class UpdateImageOfConsultantService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateImageOfConsultant';

  constructor(private dataService: DataService<UpdateImageOfConsultant>) {
  };

  public getAll(): Observable<UpdateImageOfConsultant[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateImageOfConsultant> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateImageOfConsultant> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateImageOfConsultant> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateImageOfConsultant> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

