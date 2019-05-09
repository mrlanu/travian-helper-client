import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Attack} from './models/attack.model';
import {Subject} from 'rxjs';

export interface AttacksString {
  text: string;
}

@Injectable()
export class HttpService {

  baseUrl = environment.baseUrl;
  attcksListChanged = new Subject<Attack[]>();
  attacksList: Attack[] = [];

  constructor(private httpClient: HttpClient) { }

  getAttacksList() {
    this.attcksListChanged.next(this.attacksList);
  }

  sendForParsing(text: AttacksString) {
    const url = `${this.baseUrl}/parse-attacks`;
    this.httpClient.post<Attack[]>(url, text).subscribe(attacks => {
      this.attacksList.push(...attacks);
      this.attcksListChanged.next(this.attacksList);
    });
  }

  sendForSave(attacks: Attack[]) {
    const url = `${this.baseUrl}/attacks`;
    this.httpClient.post(url, attacks).subscribe(resp => {
      console.log(resp);
    });
  }
}
