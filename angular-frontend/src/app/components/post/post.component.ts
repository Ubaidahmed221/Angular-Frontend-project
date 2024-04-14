import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment.development'
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../dialogs/create-post/create-post.component';
import { UpdateProductComponent } from '../dialogs/update-product/update-product.component';

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
        // console.log(this.products);
        if(result.status == 200){
          this.products.push(result.product);
          this.products = [...this.products];
        }
      });

    }



}
