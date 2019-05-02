import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-test-parsing',
  templateUrl: './test-parsing.component.html',
  styleUrls: ['./test-parsing.component.css']
})
export class TestParsingComponent implements OnInit {

  testForm: FormGroup;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.testForm = new FormGroup({
      text: new FormControl()
    });
  }

  onSubmit() {
    this.httpService.sendForParsing(this.testForm.value).subscribe(response => {
      console.log(response);
    });
  }
}
