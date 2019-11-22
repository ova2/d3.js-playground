import { BoundingBox } from '../shared/bounding-box.interface';
import { Punkt } from '../shared/math.interface';

export interface Gleisbild {
  id: string;
  boundingBox: BoundingBox;
  initialFocus: Punkt;

  [key: string]: any;
}
