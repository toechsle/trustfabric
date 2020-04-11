import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { AddToConsultantsOfProposedProject } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AddToConsultantsOfProposedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.AddToConsultantsOfProposedProject';

  constructor(private dataService: DataService<AddToConsultantsOfProposedProject>) {
  };

  public getAll(): Observable<AddToConsultantsOfProposedProject[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<AddToConsultantsOfProposedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<AddToConsultantsOfProposedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<AddToConsultantsOfProposedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<AddToConsultantsOfProposedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

