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
    this.componentSubs.push(this.httpService.getServerTime()
      .subscribe((time: string) => {
        console.log(time);
      setInterval(() => {
        const d = new Date();
        d.setHours(+time.split(':')[0]);
        this.serverTime = d.toLocaleTimeString('en-US', { hour12: false });
      }, 1000);
    }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
