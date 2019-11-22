import { Pfad, Punkt } from '../../shared/math.interface';
import { GleisbildElement } from '../../gleisbild/gleisbild-element.interface';

export interface Edge extends GleisbildElement {
  pfad: Pfad;
}

export interface EdgeRichtung {
  position: Punkt;
  rotation: number;
}
