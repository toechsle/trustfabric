
import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveTeamleaderFromConsultant } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveTeamleaderFromConsultantService {

	
		private NAMESPACE: string = 'org.ifb.trustfabric.RemoveTeamleaderFromConsultant';
	



    constructor(private dataService: DataService<RemoveTeamleaderFromConsultant>) {
    };

    public getAll(): Observable<RemoveTeamleaderFromConsultant[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getTransaction(id: any): Observable<RemoveTeamleaderFromConsultant> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addTransaction(itemToAdd: any): Observable<RemoveTeamleaderFromConsultant> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveTeamleaderFromConsultant> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteTransaction(id: any): Observable<RemoveTeamleaderFromConsultant> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}

