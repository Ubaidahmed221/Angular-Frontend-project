import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css'
})
export class DeletePostComponent {

  name:string = '';
  productId:string = '';

  constructor(private apiService:ApiService,public  dialogRef: MatDialogRef<DeletePostComponent>,@Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {
  this.name =  this.data.name;
  this.productId = this.data.p_id;

  }
  deleteProduct(){
    this.apiService.DeleteProduct(this.productId).subscribe(data => {
      if(data.status){
        this.dialogRef.close(this.data);
        alert('Product Delete!');

      }
    })
  }

  closeModel(){
    this.dialogRef.close();
  }

}
