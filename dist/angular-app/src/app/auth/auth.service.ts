import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import  { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';
import * as firebase from '../../../node_modules/firebase';
import { BehaviorSubject, Subject } from '../../../node_modules/rxjs/Rx';
import { UIService } from '../ui-service.service';

@Injectable()
export class AuthService implements OnDestroy {

    task: AngularFireUploadTask;  
    private authenticated: BehaviorSubject<boolean>; 
    private newUser: BehaviorSubject<boolean>; 
    private idOfCurrentUser: string;

    private roleOfCurrentUser: string;
    private subscription: Subscription;
    private subscription2: Subscription;
    private businessNetworkCardFile: File = null;
    private accountSetupFinished: Subject<boolean>; 
    private db = firebase.firestore();


    constructor(private router: Router, private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private storage: AngularFireStorage, private uiService: UIService) {

        const settings = {timestampsInSnapshots: true};
        this.db.settings(settings);

        this.accountSetupFinished = new Subject<boolean>(); 
        this.authenticated = new BehaviorSubject<boolean>(false); 
 
        let alreadyAuthenticated = sessionStorage.getItem('authenticated');
       
        if (alreadyAuthenticated == 'true') {
            this.authenticated.next(true);
            this.idOfCurrentUser = sessionStorage.getItem('idOfCurrentUser');
            this.roleOfCurrentUser = sessionStorage.getItem('roleOfCurrentUser');
        }

        this.newUser = new BehaviorSubject<boolean>(false); 


        this.subscription = this.activatedRoute
                            .queryParams
                            .subscribe(queryParams => {
                               
                                let authenticated = queryParams['authenticated'];
                                if (authenticated) {
                                    this.authenticated.next(true);
                                    sessionStorage.setItem('authenticated', 'true');
                                    this.router.navigate(['']);
                                    return this.getContentOfWalletOfCurrentUser()
                                        .then(result => {
                                            if (result.length > 0) {
                                                console.log("The user already has a business network card.");
                                                this.getCurrentUser();
                                                this.uiService.loadingStateChanged.next(false);
                                            }
                                            else {
                                                this.uiService.loadingStateChanged.next(false);
                                                this.newUser.next(true);
                                            }
                                        });  
                                }
                            });

    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }


    getIdOfCurrentUser() {
        return this.idOfCurrentUser;
    }

    setIdOfCurrentUser(id: string) {
        this.idOfCurrentUser = id;
    }

    getRoleOfCurrentUser() {
        return this.roleOfCurrentUser;
    }

    isAutenticated(): BehaviorSubject<boolean> {
        return this.authenticated;
    }

    accountSetupWasSuccessful(): Subject<boolean> {
        return this.accountSetupFinished;
    }


    isNewUser(): BehaviorSubject<boolean> {
        return this.newUser;
    }

    setNewUserToFalse() {
        this.newUser.next(false);
    }


    hasRole(expectedRole: string) {
        if (this.roleOfCurrentUser == expectedRole) {
            return true;
        }
        return false;
    }


    addUserToDatabase(participantId: string, url: string) {
        var usersRef = this.db.collection("users");     
        usersRef.doc(participantId).set({
            id: participantId,
            cardURL: url 
        })   
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    getCurrentUser(): Promise<any> {

        return this.httpClient.get('/api/system/ping', {withCredentials: true}).toPromise()
        .then(data => {
            let participant = data['participant'];
            console.log("The current user is: " + participant);
            this.idOfCurrentUser = this.getId(participant);
            this.roleOfCurrentUser = this.getRole(participant);
            sessionStorage.setItem('idOfCurrentUser', this.idOfCurrentUser);
            sessionStorage.setItem('roleOfCurrentUser', this.roleOfCurrentUser);
        });

    }

    private getId(str: string) {
        return str.split('#')[1];
    }

    private getRole(str: string) {
        let text = str.substr(0, str.indexOf('#')); 
        if (text == "org.ifb.trustfabric.Client") {
            return "Client";
        }
        else if (text == "org.ifb.trustfabric.Consultant") {
            return "Consultant";
        }
        else if (text == "org.ifb.trustfabric.ClientAdministrator") {
            return "ClientAdmin";
        }
        else if (text == "org.ifb.trustfabric.ConsultantAdministrator") {
            return "ConsultantAdmin";
        }
        else {
            return "NetworkAdmin"
        }
    }


    private getContentOfWalletOfCurrentUser(): Promise<any> {
        return this.httpClient.get('/api/wallet', {withCredentials: true}).toPromise();
    }
    

    createBusinessNetworkCardFile(id: string, role: string): Promise<any> {
        
        let namespace;
        let identity;

        if (role == "ClientAdmin") {
            namespace = "org.ifb.trustfabric.ClientAdministrator";
            identity = {
                participant: namespace + '#' + id,
                userID: id,
                options: {issuer: true}
            };
        }
        else if (role == "ConsultantAdmin") {
            namespace = "org.ifb.trustfabric.ConsultantAdministrator";
            identity = {
                participant: namespace + '#' + id,
                userID: id,
                options: {issuer: true}
            };
        }
        else if (role == "Client") {
            namespace = "org.ifb.trustfabric.Client";
            identity = {
                participant: namespace + '#' + id,
                userID: id,
                options: {}
            };
        }
        else if (role == "Consultant") {
            namespace = "org.ifb.trustfabric.Consultant";
            identity = {
                participant: namespace + '#' + id,
                userID: id,
                options: {}
            };
        }

        return this.httpClient.post('/api/system/identities/issue', identity, {responseType: 'blob'}).toPromise()
        .then(cardData => {
       
            this.businessNetworkCardFile = new File([cardData], 'businessNetworkCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
            this.addBusinessNetworkCardFileToDatabase(id);

        });

    }


    private addBusinessNetworkCardFileToDatabase(id: string) {

        const filePath = `${id}/cardFile/businessNetworkCard.card`;
        const fileRef = this.storage.ref(filePath);
        this.task = this.storage.upload(filePath, this.businessNetworkCardFile);
    
        this.subscription2 = this.task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((value) => {
              const cardURL = value;
              this.addUserToDatabase(id, cardURL);
            });
          })
        )
        .subscribe();

    }


    getBusinessNetworkCardFileFromDatabaseAndAddToWallet() {

        var docRef = this.db.collection("users").doc(this.idOfCurrentUser);
        docRef.get().then(doc => {
            if (doc.exists) {
                
                var url = doc.data().cardURL;
 
                return fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    console.log('File downloaded as blob');
                    this.businessNetworkCardFile = new File([blob], 'businessNetworkCard.card', {type: 'application/octet-stream', lastModified: Date.now()});   
                })
                .then(() => {

                    const formData = new FormData();
                    formData.append('card', this.businessNetworkCardFile);
            
                    const headers = new HttpHeaders();
                    headers.set('Content-Type', 'multipart/form-data');
                    return this.httpClient.post('/api/wallet/import', formData, {withCredentials: true, headers}).toPromise();
                
                })
                .then(() => {
                   return this.getCurrentUser();
                })
                .then(() => {
                    this.setNewUserToFalse();
                    this.accountSetupFinished.next(true);
                })
                .catch(error => {
                    console.error('Something went wrong while downloading the business network card:', error);
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


    }


    addBusinessNetworkCardToWallet(): Promise<any> {
        
        const formData = new FormData();
        formData.append('card', this.businessNetworkCardFile);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('/api/wallet/import', formData, {withCredentials: true, headers}).toPromise();

    }



}