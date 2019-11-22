export interface Punkt {
  x: number;
  y: number;
}

export type Pfad = Punkt[];

export type PathSequence = Pfad[];

export interface PositionRichtung {
  position: Punkt;
  blickrichtung: string;
}

export interface Label {
  typ: string;
  label: string;
}

export interface LabelPositionRichtung {
  positionRichtung: PositionRichtung;
  label: Label;
}

export interface LabelPfad {
  pfad: LabelPositionRichtung[];
}
