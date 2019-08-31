import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';
import { Property } from 'src/app/models/property.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  imgSrc = '';
  selectedImage: any = null;
  isSubmitted = false;
  pourcentage: number = null;
  showProgres = false;

  formTemplate = new FormGroup({
      caption: new FormControl('', [Validators.required]),
      category: new FormControl(''),
      imageUrl: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
  });

  constructor(private storage: AngularFireStorage, private imageService: ImageService) { }

  ngOnInit() {
    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
        if (event.target.files[0].type.match(/image\/*/) == null) {
          this.imgSrc = '/assets/img/not-available.jpg';
          alert('Seules les images sont supportées');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => this.imgSrc = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/placeholder2.png';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const folder = formValue.value['category'];
      this.showProgres = true;

      const filePath = `${folder}/${this.selectedImage.name.split('.').splice(0, 1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedImage);

      uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              // tslint:disable-next-line: max-line-length
              this.imageService.insertPropertyDetail(new Property(formValue.value['caption'], formValue.value['category'], url, formValue.value['description'], formValue.value['prix']));
              this.resetForm();
            });
          })
        ).subscribe();

      uploadTask.percentageChanges().subscribe(
        pourcentage => {
          if (Math.round(pourcentage) === 100) {this.showProgres = false ; }
        },
        error => {
          console.log(error);
          this.showProgres = false ;
        }
      );
    }
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: '',
      category: 'Appartement',
      description: '',
      prix: null
    });
    this.imgSrc = '/assets/img/placeholder2.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  get formControls() {
    return this.formTemplate['controls'];
  }



}
