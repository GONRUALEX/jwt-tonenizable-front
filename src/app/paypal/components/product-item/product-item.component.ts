import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input("product") product: Product;

  constructor(
    private messageService: MessageService
  ){}

  ngOnInit(){}

  addToCart():void{
    this.messageService.sendMessage(this.product);
  }
}
