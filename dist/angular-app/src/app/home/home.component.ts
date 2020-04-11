import { Component } from '@angular/core';
import { Subscription, BehaviorSubject } from '../../../node_modules/rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AccountSetUpMessageComponent } from './account-set-up-message/account-set-up-message.component';
import { UIService } from '../ui-service.service';
import * as firebase from '../../../node_modules/firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoading = false;
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription; 
  private isAuthenticated$: BehaviorSubject<boolean>;
  public isAuthenticated: boolean;
  private isNewUser$: BehaviorSubject<boolean>;
  public isNewUser: boolean;
  private participantId;
  private successMessage;
  private errorMessage;
  private db = firebase.firestore();


  constructor(private authService: AuthService, private uiService: UIService, private storage: AngularFireStorage, private dialog: MatDialog) { 

    const settings = {timestampsInSnapshots: true};
    this.db.settings(settings);

  }

 
  ngOnInit() {

    this.isAuthenticated$ = this.authService.isAutenticated();
    this.isNewUser$ = this.authService.isNewUser();

    this.subscription = this.isAuthenticated$.subscribe(res => {
        if (res) {
            this.isAuthenticated = true;
        } 
        else {
            this.isAuthenticated = false;
        }
    });

    this.subscription2 = this.isNewUser$.subscribe(res => {
      if (res) {
          this.isNewUser = true;
      } 
      else {
          this.isNewUser = false;
      }
    });

    this.subscription4 = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });


  }


  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if (this.subscription3) {
      this.subscription3.unsubscribe();
    }
    if (this.subscription4) {
      this.subscription4.unsubscribe();
    }
  }


  onSubmit(form: NgForm) {

    this.uiService.loadingStateChanged.next(true);
    this.participantId = form.value.initToken;
    this.authService.setIdOfCurrentUser(this.participantId);
    form.resetForm();
    this.authService.getBusinessNetworkCardFileFromDatabaseAndAddToWallet();
    this.subscription3 = this.authService.accountSetupWasSuccessful().subscribe(res => {
        if (res) {    
          this.uiService.loadingStateChanged.next(false);
          this.successMessage = "Your account has been set up.";
          this.dialog.open(AccountSetUpMessageComponent, {data: {title: "Success", text: this.successMessage}});
          this.deleteDataUsedForAccountSetUp();
        } 
        else {
          this.uiService.loadingStateChanged.next(false);
          this.errorMessage = "Your account could not be set up.";
          this.dialog.open(AccountSetUpMessageComponent, {data: {title: "Error", text: this.errorMessage}});
        }
    });

  }


  onLinkClicked() {
    this.uiService.loadingStateChanged.next(true);
  }

  private deleteDataUsedForAccountSetUp() {
    
    this.db.collection("users").doc(this.participantId).delete().then(() => {
      
      console.log("Document successfully deleted from Firestore!");
      
      let filePath = `${this.participantId}/cardFile/businessNetworkCard.card`;
      let fileRef = this.storage.ref(filePath);

      fileRef.delete().toPromise()  
      .then(() => {
        console.log("Business network card successfully deleted from Firebase Storage!");
      })
      .catch(error => {
        console.error("Error removing business network card: ", error);
      });

    }).catch(error => {
      console.error("Error removing document: ", error);
    });

  }


}
