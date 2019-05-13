export interface Attack {
  offer: Village;
  deffer: Village;
  time: Date;
  duration: Date;
  parsingTime: Date;
  userId: number;
}

export interface Player {
  id: number;
  name: string;
  alliance: string;
}

export interface Village {
  id: number;
  name: string;
  x: number;
  y: number;
  player: Player;
}
