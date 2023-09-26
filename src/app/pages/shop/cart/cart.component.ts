import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/shared/service/message.service';
import { CartItemModel } from 'src/app/shared/model/car-item-model';
import { StorageService } from 'src/app/shared/service/storage.service';
import { Producto } from 'src/app/shared/model/product';
import { Paypal } from 'src/app/shared/model/paypal';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  facId: any;
  amounPaypal: string;
  address:any;
  userFac: any;
  dateFac: any;
  itemsPaypal: any;
  cartItems: CartItemModel[] = [];
  total: number = 0;
  public loading = false;
  @ViewChild("empty", { static: false }) empty: ElementRef;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private messageService: MessageService,
    private renderer: Renderer2,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    $('#modalPaypal').modal('hide');
  
    this.initConfig();
    if (this.storageService.existsCarts()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItems();
    this.delayAnimation();
    this.total = this.getTotal();
  }

  delayAnimation() {
    setInterval(() => {
      if (this.empty != undefined) {
        if (this.empty.nativeElement.classList.contains('animate__infinite')) {
          this.renderer.removeClass(this.empty.nativeElement, 'animate__infinite');
        }
        else {
          this.renderer.addClass(this.empty.nativeElement, 'animate__infinite');
        }
      }
    }, 2000)
  }

  getItems(): void {
    this.messageService.getMessage().subscribe({
      next: (product: Producto) => {
        let exists = false;
        this.cartItems.forEach((item) => {
          if (item.productId == product.id) {
            exists = true;
            item.qty++;
          }
        });
        if (!exists) {
          const cartItem = new CartItemModel(product);
          this.cartItems.push(cartItem);
        }
        this.total = this.getTotal();
        this.storageService.setCart(this.cartItems);
      },
      error: () => {
        console.log("error")
      }
    });
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.qty * (+item.productPrice);
    });
    return +total.toFixed(2);
  }

  clearCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }


  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.clientPaypal,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.getTotal().toString(),
              }
            }
          },
          items: this.getPaypalList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.loading = true;
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', JSON.stringify(data));
        this.itemsPaypal = data.purchase_units[0].items;
        this.amounPaypal = data.purchase_units[0].amount.value;
        this.address = data.purchase_units[0].shipping;
        this.userFac = data.payer;
        this.dateFac = new Date(data.create_time);
        this.facId =  data.id;
        $('#modalPaypal').modal('show');
        this.clearCart();
        this.loading=false;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        
      }
    };
  }

  getPaypalList(): Paypal[]{
    const paypalList: Paypal[] = [];
    let item: Paypal = {};
    this.cartItems.forEach((it:CartItemModel)=>{
      item = {
        name: it.productName,
        quantity: it.qty.toString(),
        unit_amount:{
          value:it.productPrice,
          currency_code:'EUR'
        }
      }
      paypalList.push(item);
    });
    return paypalList;
  }

  closeModalPaypal():void{
    $('#modalPaypal').modal('hide');
  }
}
