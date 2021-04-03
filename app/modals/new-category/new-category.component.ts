import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categories: any[] = [];

  constructor(
    public categoryService: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  category = {
    categId: null,
    name: ""
  }

  cancel(){
    this.activeModal.dismiss();
  }

  close(){
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  postCategory(){
    if(this.categories.length == 0){
      this.category.categId = 1;
    }
    else if(this.categories.length > 0){
      this.category.categId = this.categories[this.categories.length - 1].categId + 1;
    }
      this.categoryService.createC(this.category).subscribe(c => c);  
  }

  async getCategories(){
    await this.categoryService.getC().subscribe(categories => this.categories = categories); 
  }

}
