import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {

  @Input() categId;
  @Input() name;

  itens: any[] = [];
  itensCateg:  any[] = [];

  constructor(
    public itensService: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  item = {
    categId: null,
    itemId: null,
    description: ''
  }

  cancel(){
    this.activeModal.dismiss();
  }

  close(){
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.getItens().then(() => {
      this.itens.forEach(e => {
         this.itensCateg.push(e);
     });
    });
  }

  async getItens(){
    await this.itensService.getI(this.categId).subscribe(i => this.itens = i);
  }

  postItem(){
    console.log(this.itensCateg.length)
    this.item.categId = this.categId;
    if(this.itens.length == 0){
      this.item.itemId = 1;
    }else{
      this.item.itemId = this.itens[this.itens.length - 1].itemId + 1;
    }
    this.itensService.createI(this.item).subscribe(i => i, console.log, () => {
      this.getItens();
    });
    setTimeout(() => {
      this.itensService.getI(this.categId).subscribe(i => this.itens = i);
    }, 1000);
  }

  deleteCategory(){
     this.itensService.deleteC(this.categId).subscribe(c => c);
  }
}
