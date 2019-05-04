import {Time} from '@angular/common';

export interface Attack {
  accountName: string;
  attackingVillage: string;
  attackedVillage: string;
  attackingVillageX: number;
  attackingVillageY: number;
  attackedVillageX: number;
  attackedVillageY: number;
  duration: Time;
  arrivedTime: Time;
}
