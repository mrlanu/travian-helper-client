import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Attack, CrossAttack} from '../models/attack.model';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-cross-table',
  templateUrl: './cross-table.component.html',
  styleUrls: ['./cross-table.component.css']
})
export class CrossTableComponent implements OnInit, OnDestroy {

  crossAttacks: CrossAttack[] = [];
  componentSubs: Subscription[] = [];
  dataSource = new MatTableDataSource<CrossAttack>();

  allColumnsDefinition: string[] = ['attackedVillage'];
  dynamicColumnDefinition: string[] = [];


  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.crossAttacksChanged
      .subscribe(crossAttacks => {
        for (const i of crossAttacks[0].offerAttacks) {
          this.dynamicColumnDefinition.push(i.offer.id.toString());
        }
        this.allColumnsDefinition = [...this.allColumnsDefinition, ...this.dynamicColumnDefinition];
      this.dataSource.data = crossAttacks;
      console.log(this.dataSource.data);
    }));
    this.httpService.getCrossAttacks();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
