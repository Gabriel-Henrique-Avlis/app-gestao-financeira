import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';
import { ItensComponent } from './modals/itens/itens.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestao-financas';

  categories: any[] = [];

  constructor(
    public categoryService: ApiService,
    public ms: NgbModal
    ){
  }

 async getCategories(){
    await this.categoryService.getAllCategories().subscribe(categories => this.categories = categories);
  }

  openItens(c: any, n:any){
   const categ = this.ms.open(ItensComponent, {size:'xl', animation: true, backdropClass:'modal-backdrop-page'});
   categ.componentInstance.categId = c;
   categ.componentInstance.name = n;
  }

  ngOnInit(){
    this.getCategories();
    console.log(this.categories.length)
  }

}
