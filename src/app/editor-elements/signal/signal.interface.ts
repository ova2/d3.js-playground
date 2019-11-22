import { PositionRichtung } from '../../shared/math.interface';

export interface Signal {
  id: string;
  positionRichtung: PositionRichtung;
  bezeichnung: string;
  typ: SignalTyp;
  rangierziel: boolean;
  unoId: number;
}

export enum SignalTyp {
  HAUPTSIGNAL = 'HAUPTSIGNAL',
  RANGIERSIGNAL = 'RANGIERSIGNAL'
}
