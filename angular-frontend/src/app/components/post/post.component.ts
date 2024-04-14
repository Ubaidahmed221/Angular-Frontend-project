import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment.development'
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../dialogs/create-post/create-post.component';
import { UpdateProductComponent } from '../dialogs/update-product/update-product.component';
import { DeletePostComponent } from '../dialogs/delete-post/delete-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  displayedColumns: string[] = ['p_id', 'name', 'image', 'action'];

  products:any[] = [];
  url:any = '';

  constructor( private apiService:ApiService, public dialog: MatDialog) {}

    ngOnInit(){
      this.url = environment.url;
      this.getProductData();

    }

    getProductData() : void{
      this.apiService.getproduct().subscribe(data => {
        this.products = data.products;
        // console.log(data);
      })
    }

    openCreateModal():void {
     const dialogref =  this.dialog.open(CreatePostComponent,{
        data: {},
      });
      dialogref.afterClosed().subscribe(result => {
        console.log('the dialog has been closed');
        console.log(result)

        if(result.status == 200){
          this.products.push(result.product);
          this.products = [...this.products];
        }
      });

    }
    openUpdateModal(data:any) :void {
       const dialogref =  this.dialog.open(UpdateProductComponent,{
          data: data,
        });
        dialogref.afterClosed().subscribe(result => {
          console.log('the update dialog has been closed');
          if(result != undefined){
            const UpdatePro = result.product;
            const index = this.products.findIndex(products => products.p_id === UpdatePro.p_id);
            if(index !== -1){
            this.products =  this.products.map((item, i)=> i === index ? UpdatePro : item );

            }

          }
        });

      }
      openDeleteModel(data:any) :void {
        const dialogref =  this.dialog.open(DeletePostComponent,{
           data: data,
         });
         dialogref.afterClosed().subscribe(result => {
           console.log('the Delete dialog has been closed');
           if(result != undefined){
           this.products = this.products.filter(item => item.p_id !== result.p_id);


           }
         });

       }



}
