import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopRoutingModule } from './shop-routing.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPayPalModule } from 'ngx-paypal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    PrincipalComponent,
    ProductItemComponent,
    ProductListComponent,

  ],
  imports: [
    NgxPayPalModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: "rgb(0, 128, 128,0.2)",
      backdropBorderRadius: "200px",
      primaryColour: "#008080",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ShopModule { }
