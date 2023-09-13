import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmailValuesDto } from '../model/email-values-dto';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from '../auth/changePassword/change-password/change-password.component';
import { ChangePasswordDto } from '../model/change-password-dto';

@Injectable({
  providedIn: 'root',
})
export class EmailPasswordService {
  changePasswordUrl: string = environment.changePasswordUrl;
  constructor(private httpClient: HttpClient) {}

  public sendEmail(dto: EmailValuesDto): Observable<any> {
    return this.httpClient.post<any>(this.changePasswordUrl+'send-email', dto);

  }

  public changePassword(dto: ChangePasswordDto): Observable<any>{
    return this.httpClient.post<any>(this.changePasswordUrl+'change-password', dto);
  }

}
