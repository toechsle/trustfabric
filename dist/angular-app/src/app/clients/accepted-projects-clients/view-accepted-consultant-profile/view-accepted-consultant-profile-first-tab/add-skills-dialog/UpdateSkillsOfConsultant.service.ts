import { Injectable } from '@angular/core';
import { DataService } from '../../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { UpdateSkillsOfConsultant } from '../../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class UpdateSkillsOfConsultantService {

  private NAMESPACE = 'org.ifb.trustfabric.UpdateSkillsOfConsultant';

  constructor(private dataService: DataService<UpdateSkillsOfConsultant>) {
  };

  public getAll(): Observable<UpdateSkillsOfConsultant[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<UpdateSkillsOfConsultant> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<UpdateSkillsOfConsultant> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<UpdateSkillsOfConsultant> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<UpdateSkillsOfConsultant> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

