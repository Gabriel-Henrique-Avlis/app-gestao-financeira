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
    public md: NgbActiveModal
  ) { }

  category = {
    categId: null,
    name: ""
  }

  cancel(){
    this.md.dismiss();
  }

  ngOnInit(): void {
    this.getCategories().then(() => {
      this.category.categId = this.categories[this.categories.length - 1].categId + 1;
    })
  }

  async postCategory(){
    console.log(this.category);
    await this.categoryService.create(this.category);
    this.md.dismiss();
    this.getCategories();
  }

  async getCategories(){
    await this.categoryService.getAllCategories().subscribe(categories => this.categories = categories); 
  }

}
