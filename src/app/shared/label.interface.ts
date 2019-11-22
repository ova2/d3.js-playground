import { Punkt } from './math.interface';
import { GleisbildElement } from '../gleisbild/gleisbild-element.interface';

export interface Label extends GleisbildElement {
  position: Punkt;
  text: string;
  style: string;
  align: LabelAlign;
}

export enum LabelAlign {
  LEFT = 'LEFT',
  CENTER = 'CENTER',
  RIGHT = 'RIGHT'
}
