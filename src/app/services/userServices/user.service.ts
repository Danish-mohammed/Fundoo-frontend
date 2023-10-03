import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: any;

  constructor(
    private httpService: HttpService,
    private httpClient: HttpClient,
  ) {
    this.token = localStorage.getItem('token');
  }

  LogIn(reqdata: any) {
    //console.log(reqdata);

    let header = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        //'Authorisation':'token'
      }),
    };

    return this.httpClient.post(
      'http://localhost:9090/api/user/login',
      reqdata,
    );
  }

  Registration(reqdata: any) {
    let header = {
      header: new HttpHeaders({
        'Content-type': 'application/json',
        //'Authorisation':'token'
      }),
    };
    return this.httpClient.post('http://localhost:9090/api/user/', reqdata);
  }

  ForgetPassword(reqdata: any) {
    let header = {
      header: new HttpHeaders({
        'Content-type': 'application/json',
        //'Authorisation':'token'
      }),
    };
    return this.httpService.postService(
      'User/ForgetPassword?email=' + reqdata.email,
      reqdata,
      false,
      header,
    );
  }

  Reset(reqdata: any, token: any) {
    let header = {
      header: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: token,
      }),
    };
    return this.httpService.putService(
      `User/ResetPassword?newPassword=${reqdata.newPassword}&confirmPassword=${reqdata.confirmPassword}`,
      reqdata,
      true,
      header,
    );
  }
}
