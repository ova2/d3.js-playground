export const labelAlignerFn = l => {
  switch (l.align) {
    case 'LEFT':
      return 'end';
    case 'RIGHT':
      return 'start';
    default:
      return 'middle';
  }
};

export const toRotation = (blickrichtung) => {
  switch (blickrichtung) {
    case 'LINKS':
      return 180;
    case 'RECHTS':
      return 0;
    case 'OBEN':
      return -90;
    case 'UNTEN':
      return 90;
    case 'RO':
      return -45;
    case 'RU':
      return 45;
    case 'LO':
      return -135;
    case 'LU':
      return 135;
    default:
      console.warn(`Unknown blickrichtung ${blickrichtung}`);
      return 0;
  }
};
