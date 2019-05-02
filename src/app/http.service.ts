import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

export interface AttacksString {
  text: string;
}

@Injectable()
export class HttpService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  sendForParsing(text: AttacksString) {
    const url = `${this.baseUrl}/attacks`;
    /*const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa('my-trusted-client:secret')
      })
    };*/
    return this.httpClient.post(url, text);
  }
}
