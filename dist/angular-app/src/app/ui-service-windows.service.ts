import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIWindowService {

  loadingStateChanged = new Subject<boolean>();

}