import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/shared/model/product';
import { MessageService } from 'src/app/shared/service/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input("product") product: Producto;

  constructor(
    private messageService: MessageService
  ){}

  ngOnInit(){}

  addToCart():void{
    this.messageService.sendMessage(this.product);
  }
}
