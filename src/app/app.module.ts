import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './pages/index/index.component';
import { interceptorProvider } from './core/interceptors/prod-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ShopModule } from './pages/shop/shop.module';
import { ProductoModule } from './pages/producto/producto.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ShopModule,
    ProductoModule,
    SharedModule,
    CoreModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
