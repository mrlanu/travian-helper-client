import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Attack, CrossAttack, Village} from './models/attack.model';
import {Subject} from 'rxjs';

export interface AttacksString {
  text: string;
}

@Injectable()
export class HttpService {

  baseUrl = environment.baseUrl;
  attacksListChanged = new Subject<Attack[]>();
  crossAttacksChanged = new Subject<CrossAttack[]>();
  attacksList: Attack[] = [];

  constructor(private httpClient: HttpClient) { }

  getAttacksList() {
    this.attacksListChanged.next(this.attacksList);
  }

  sendForParsing(text: AttacksString) {
    const url = `${this.baseUrl}/parse-attacks`;
    this.httpClient.post<Attack[]>(url, text).subscribe(attacks => {
      this.attacksList.push(...attacks);
      this.attacksListChanged.next(this.attacksList);
    });
  }

  sendForSave(attacks: Attack[]) {
    const url = `${this.baseUrl}/attacks`;
    this.httpClient.post(url, attacks).subscribe(resp => {
      console.log(resp);
    });
  }

  getServerTime() {
    const url = `${this.baseUrl}/time`;
    return this.httpClient.get(url);
  }

  getCrossAttacks() {
    const url = `${this.baseUrl}/cross-table`;
    this.httpClient.get(url).subscribe((crossAttacks: CrossAttack[]) => {
      this.crossAttacksChanged.next(crossAttacks);
    });
  }
}
