import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../http.service';
import {Attack} from '../../models/attack.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-test-parsing',
  templateUrl: './test-parsing.component.html',
  styleUrls: ['./test-parsing.component.css']
})
export class TestParsingComponent implements OnInit, OnDestroy {

  testForm: FormGroup;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.attcksListChanged.subscribe((attacks: Attack[]) => {
    }));
    this.testForm = new FormGroup({
      text: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.httpService.sendForParsing(this.testForm.value);
    this.testForm.reset();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
