import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaProductoComponent } from './pages/producto/lista-producto/lista-producto.component';
import { DetalleProductoComponent } from './pages/producto/detalle-producto/detalle-producto.component';
import { NuevoProductoComponent } from './pages/producto/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './pages/producto/editar-producto/editar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './core/auth/login/login.component';
import { RegistroComponent } from './core/auth/registro/registro.component';
import { IndexComponent } from './pages/index/index.component';
import { interceptorProvider } from './core/interceptors/prod-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './core/auth/chagePassword/change-password/change-password.component';
import { SendEmailComponent } from './core/auth/chagePassword/send-email/send-email.component';
import { MenuComponent } from './core/menu/menu.component';
import { ModalLoginComponent } from './core/auth/modal-login/modal-login.component';
import { ValidationsComponent } from './shared/components/validations/validations.component';
import { FormsComponent } from './shared/components/forms/forms.component';
import { HeaderComponent } from './paypal/components/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { PrincipalComponent } from './paypal/components/principal/principal.component';
import { ProductListComponent } from './paypal/components/product-list/product-list.component';
import { ProductItemComponent } from './paypal/components/product-item/product-item.component';
import { CartComponent } from './paypal/components/cart/cart.component';
import { CartItemComponent } from './paypal/components/cart-item/cart-item.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    ListaProductoComponent,
    DetalleProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    ModalLoginComponent,
    ValidationsComponent,
    FormsComponent,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPayPalModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: "rgb(0, 128, 128,0.2)",
      backdropBorderRadius: "200px",
      primaryColour: "#008080",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
    }),

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
