import { Injectable } from '@angular/core';
import { EditorProcessor } from '../../editor-features/editor-processor.service';
import { Signal, SignalTyp } from './signal.interface';
import { Gleisbild } from '../../gleisbild/gleisbild.interface';
import { Selection } from 'd3-selection';
import { RenderingContext } from '../../editor-features/rendering-context';
import { toRotation } from '../../shared/math.util';

@Injectable()
export class HauptsignalProcessor extends EditorProcessor<Signal> {

  public getCssClass(): string {
    return 'hauptsignal';
  }

  public getLayerIndex(): number {
    return 30;
  }

  protected extractElementsFromGleisbild(gleisbild: Gleisbild): Signal[] {
    return gleisbild.signale.filter(signal => signal.typ === SignalTyp.HAUPTSIGNAL);
  }

  protected drawElements(rc: RenderingContext, layer: Selection<SVGGElement, any, any, any>, elements: Signal[]): void {
    const elementCssClass = this.elementCssClass;
    layer.selectAll(elementCssClass)
      .data(elements, (d: Signal) => d.id)
      .join(
        enter => enter.append('polygon').attr('class', elementCssClass).attr('points', '3.2,0 -3,-5.7 -3,5.7'),
        update => update,
        exit => exit.remove()
      )
      .attr('transform', s => `translate(${rc.xScale(s.positionRichtung.position.x)} ${rc.yScale(s.positionRichtung.position.y)}) rotate(${toRotation(s.positionRichtung.blickrichtung)})`);
  }
}
