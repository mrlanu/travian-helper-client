import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {

  serverTime: string;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
      setInterval(() => {
        const d = new Date();
        this.serverTime = d.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Moscow'});
      }, 1000);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
