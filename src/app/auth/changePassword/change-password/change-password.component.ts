import { Component } from '@angular/core';
import { ChangePasswordDto } from 'src/app/model/change-password-dto';
import { EmailPasswordService } from '../../../service/email-password.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  confirmPassword:string="";
  password:string="";
  tokenPassword:string="";

  dto:ChangePasswordDto = new ChangePasswordDto("","","");
  constructor(
    private emailPasswordService: EmailPasswordService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  onChangePassword():void{
    if ( this.password!=this.confirmPassword){
      this.toastrService.error("Las constraseñas no coinciden", "Fail", {timeOut:3000, positionClass:"toast-top-center"});
      return ;
    }
    this.tokenPassword = this.activatedRoute.snapshot.params["tokenPassword"];
    this.dto = new ChangePasswordDto(this.password, this.confirmPassword, this.tokenPassword);
    this.emailPasswordService.changePassword(this.dto).subscribe({
      next: (data)=>{
        this.toastrService.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass:'toast-top-center'});
          this.router.navigate(['/login']);
      },
      error: (err)=>{
        this.toastrService.error(err.error.mensaje, "Fail", {
          timeOut: 3000, positionClass:'toast-top-center'})
      }
    });
  }
}
