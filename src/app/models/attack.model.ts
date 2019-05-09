import {Time} from '@angular/common';

export interface Attack {
  attackedAccountName: string;
  attackingAccName: string;
  attackingAccId: number;
  attackingAllianceName: string;
  attackingVillage: string;
  attackedVillage: string;
  attackingVillageX: number;
  attackingVillageY: number;
  attackedVillageX: number;
  attackedVillageY: number;
  duration: Time;
  arrivedTime: Time;
}
