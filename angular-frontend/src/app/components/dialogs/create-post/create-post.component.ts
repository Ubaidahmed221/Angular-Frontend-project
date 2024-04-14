import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  title_label:string = '';
  image_required_label:string = 'image is required';
  required:string = '';

  selectedFile:any = null;
  image_show_error:boolean = false;
  image_url:string = '';


  constructor(private apiservice:ApiService,public dialogRef: MatDialogRef<CreatePostComponent>){
  }
  form = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  ngOnInit(){
    this.getLabel();
  }
  submit(){
   this.image_show_error = false;
    if(this.selectedFile  == null){
      this.image_show_error = true
    }
    if(this.form.valid){
      const formdata = new FormData();
      formdata.append('image',this.selectedFile);
      formdata.append('name', ''+this.form.value.name);

      this.apiservice.CreateProduct(formdata).subscribe(data => {
       console.log(data);
       this.dialogRef.close(data);
      //  this.dialogRef.close({ products: [data] });
       alert('created');
      })
    }
  }
  getLabel(){
   this.title_label = 'Title';
   this.image_required_label = 'image is required';
   this.required = "  is required";
  }
  Onfileselected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
          this.selectedFile = file;
          this.image_required_label = 'Image is required';
          this.image_show_error = false;

         const reader = new FileReader();
         reader.onload = (e:any )=>{
          this.image_url = e.target.result;
         };
         reader.readAsDataURL(file);

        } else {
          this.selectedFile = null;
          this.image_required_label = "Image should be png, jpeg, or jpg extension";
          this.image_show_error = true;
        }
      }
    }
  }

  closeModal() : void{
    this.dialogRef.close();

  }


}
