import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  title_label:string = '';
  image_required_label:string = 'image is required';
  required:string = '';

  selectedFile:any = null;
  image_show_error:boolean = false;
  image_url:string = '';
  productId:string = '';


  constructor(private apiservice:ApiService,public dialogRef: MatDialogRef<UpdateProductComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any
  ){  }
  form = new FormGroup({
    name: new FormControl('',[Validators.required])
  });

  ngOnInit(){

    this.getLabel();
    this.setformvalues();
  }
        submit(){
        this.image_show_error = false;
      if(this.form.valid){
        const formdata = new FormData();
        formdata.append('id', this.productId);

        formdata.append('name', ''+this.form.value.name);
            if(this.selectedFile  != null){
                    formdata.append('image',this.selectedFile);
                  }

        this.apiservice.UpdateProduct(this.productId,formdata).subscribe(data => {
        console.log(data);
        this.dialogRef.close(data);

        alert('updated');
        })
      }
        }

  getLabel(){
   this.title_label = 'Title';
   this.image_required_label = 'image is required';
   this.required = "  is required";
  }
  setformvalues(){
    if(this.data){
      this.form.patchValue({
        name: this.data.name
      });
      this.productId = this.data.p_id;
      this.image_url = environment.url+''+this.data.image;

    }

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
