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
  dynamicColumnDefinition: any[] = [];


  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.crossAttacksChanged
      .subscribe(crossAttacks => {
        for (const i of crossAttacks[0].offerAttacks.reverse()) {
          this.dynamicColumnDefinition.push({definition: i.offer.id.toString(), header: i.offer.name, account: i.offer.player.name});
        }
        this.allColumnsDefinition = [...this.allColumnsDefinition, ...this.dynamicColumnDefinition.map(p => p.definition).reverse()];
      this.dataSource.data = crossAttacks.reverse();
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
