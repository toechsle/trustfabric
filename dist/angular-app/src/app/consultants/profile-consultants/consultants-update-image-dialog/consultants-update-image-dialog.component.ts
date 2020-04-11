import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConsultantsUpdateImageService } from '../consultants-update-image.service';
import { UpdateImageOfConsultantService } from '../UpdateImageOfConsultant.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Subscription } from '../../../../../node_modules/rxjs';
import * as firebase from '../../../../../node_modules/firebase';
import { UIService } from '../../../ui-service.service';


@Component({
  selector: 'app-consultants-update-image-dialog',
  templateUrl: './consultants-update-image-dialog.component.html',
  styleUrls: ['./consultants-update-image-dialog.component.css']
})
export class ConsultantsUpdateImageDialogComponent implements OnInit, OnDestroy {
  
  task: AngularFireUploadTask;
  inputs
  isLoading = false;
  private transaction;
  private id: string;
  private image: string = null;
  private selectedFile: File;
  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  errorMessage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private consultantsUpdateImageService: ConsultantsUpdateImageService, private updateImageOfConsultantService: UpdateImageOfConsultantService, private uiService: UIService, private dialogRef: MatDialogRef<ConsultantsUpdateImageDialogComponent>, private storage: AngularFireStorage) { }


  ngOnInit() {

    this.subscription3 = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( this.inputs, function( input )
    {
      var label	 = input.nextElementSibling,
      labelVal = label.innerHTML;

      input.addEventListener( 'change', function( e )
      {
        var fileName = '';
        fileName = e.target.value.split( '\\' ).pop();
        if( fileName )
          label.querySelector( 'span' ).innerHTML = fileName;
        else
          label.innerHTML = labelVal;
      });
    });
  }


  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    if(this.subscription2) {
      this.subscription2.unsubscribe();
    }
    if(this.subscription3) {
      this.subscription3.unsubscribe();
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
  }

  onSubmit(id: string) {

    this.uiService.loadingStateChanged.next(true);
    
    this.id = id;
    this.uploadImageToImageDatabase();
  
  }

  private uploadImageToImageDatabase() {
      
    if (this.selectedFile.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type, upload not possible')
      this.uiService.loadingStateChanged.next(false);
      return;
    }

    const filePath = `${this.id}/profilePic/originalPic`;
    this.task = this.storage.upload(filePath, this.selectedFile);

    this.subscription = this.task.snapshotChanges().pipe(
      finalize(() => {
        const data = {
          bucket: "trustfabric-a7217.appspot.com",
          filePath: filePath
        };
        var resizeImage = firebase.functions().httpsCallable('resizeImage');
        resizeImage(data).then(function(result) {
          console.log(result.data);
        })
        .then(() => {
          const path = `${this.id}/profilePic/resizedPic`
          const fileRef = this.storage.ref(path);
          this.subscription2 = fileRef.getDownloadURL().subscribe((value) => {
            this.image = value;
            return this.updateImage()
            .then(() => {
                this.consultantsUpdateImageService.dataUpdated();
                this.uiService.loadingStateChanged.next(false);
                this.dialogRef.close();
            });
          });        
        });  
      })
    )
    .subscribe();
  
  }


  private updateImage(): Promise<any> {
      
    let consultantString = "resource:org.ifb.trustfabric.Consultant#" + this.id;
   
    this.transaction = {
      $class: "org.ifb.trustfabric.UpdateImageOfConsultant",       
          "consultant": consultantString,   
          "newImage": this.image,  
          "timestamp": new Date().getTime()
    };

    return this.updateImageOfConsultantService.addTransaction(this.transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
        if(error == 'Server error'){
          this.errorMessage = "Could not connect to REST server. Please check your configuration details.";
        }
        else if(error == '404 - Not Found'){
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
          this.errorMessage = error;
        }
    });

  }


}
