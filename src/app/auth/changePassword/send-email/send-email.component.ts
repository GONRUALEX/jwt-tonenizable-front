import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailValuesDto } from 'src/app/model/email-values-dto';
import { EmailPasswordService } from 'src/app/service/email-password.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent {

  mailTo: string = "";
  dto: EmailValuesDto = new EmailValuesDto("");
  constructor(private emailPasswordService: EmailPasswordService,
    private toastr: ToastrService){}

  onSendEmail(){
    this.dto=new EmailValuesDto(this.mailTo);

    this.emailPasswordService.sendEmail(this.dto).subscribe({next: (data)=>{
      this.toastr.success(data.mensaje, 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    }, error: (err)=>{
      this.toastr.error(err.error.mensaje, "Fail", {
        timeOut: 3000, positionClass: 'toast-top-center'
      })
    }})
  }

}
