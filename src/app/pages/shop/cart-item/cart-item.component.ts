import { Component, Input } from '@angular/core';
import { CartItemModel } from 'src/app/shared/model/car-item-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
@Input() cartItem: CartItemModel;

convertStringToNumber(input: string) { 
    
  if (!input) return NaN;

  if (input.trim().length==0) { 
      return NaN;
  }
  return Number(input);
}
}
