import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddTeamleaderWithGivenEmailToConsultant } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';


// Can be injected into a constructor
@Injectable()
export class AddTeamleaderWithGivenEmailToConsultantService {

  private NAMESPACE = 'org.ifb.trustfabric.AddTeamleaderWithGivenEmailToConsultant';

  constructor(private dataService: DataService<AddTeamleaderWithGivenEmailToConsultant>) {
  };

  public getAll(): Observable<AddTeamleaderWithGivenEmailToConsultant[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddTeamleaderWithGivenEmailToConsultant> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddTeamleaderWithGivenEmailToConsultant> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddTeamleaderWithGivenEmailToConsultant> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddTeamleaderWithGivenEmailToConsultant> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

