import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToConsultantsOfAcceptedProject } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';


// Can be injected into a constructor
@Injectable()
export class AddToConsultantsOfAcceptedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToConsultantsOfAcceptedProject';

  constructor(private dataService: DataService<AddToConsultantsOfAcceptedProject>) {
  };

  public getAll(): Observable<AddToConsultantsOfAcceptedProject[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToConsultantsOfAcceptedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToConsultantsOfAcceptedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToConsultantsOfAcceptedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToConsultantsOfAcceptedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

