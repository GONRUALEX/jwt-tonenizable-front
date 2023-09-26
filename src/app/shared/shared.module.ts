import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationsComponent } from './components/validations/validations.component';
import { FormsComponent } from './components/forms/forms.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ValidationsComponent,
    FormsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FormsComponent
  ]
})
export class SharedModule { }
