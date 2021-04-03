import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { ItensComponent } from './modals/itens/itens.component';
import { NewCategoryComponent } from './modals/new-category/new-category.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestão de Finanças';

  categories;

  constructor(
    public categoryService: ApiService,
    public ms: NgbModal
    ){
  }

 async getCategories(){
    await this.categoryService.getC().subscribe(categories => this.categories = categories);
  }

  openItens(c: any, n:any){
   const categ = this.ms.open(ItensComponent, {size:'xl', animation: true, backdropClass:'modal-backdrop-page'});
   categ.componentInstance.categId = c;
   categ.componentInstance.name = n;
   console.log(c, n)
   categ.result.then(() => {
     setTimeout(() => {
       this.categories = [];
       this.categoryService.getC().subscribe(c => this.categories = c);
     }, 1000)
    }
   )
  }

  openNewCategory(){
    const nCateg = this.ms.open(NewCategoryComponent, {size:'sm', animation: true, backdropClass:'modal-backdrop-page'});
    nCateg.result.then(
      () => {
        setTimeout(() => {
          this.categories = [];
          this.categoryService.getC().subscribe(c => this.categories = c);
          console.log(this.categories)        
        }, 1000);
      }
    )
   }

  ngOnInit(){
    this.getCategories();
  }
}
