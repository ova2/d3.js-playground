import { Injectable } from '@angular/core';
import { EditorProcessor } from '../../editor-features/editor-processor.service';
import { Gleisbild } from '../../gleisbild/gleisbild.interface';
import { Selection } from 'd3-selection';
import { Betriebspunkt } from './betriebspunkt.interface';
import { RenderingContext } from '../../editor-features/rendering-context';
import { labelAlignerFn } from '../../shared/math.util';

@Injectable()
export class BetriebspunktProcessor extends EditorProcessor<Betriebspunkt> {

  public getCssClass(): string {
    return 'label-bp';
  }

  public getLayerIndex(): number {
    return 10;
  }

  protected extractElementsFromGleisbild(gleisbild: Gleisbild): Betriebspunkt[] {
    return gleisbild.labels.filter(l => l.style === 'betriebspunkt');
  }

  protected drawElements(rc: RenderingContext, layer: Selection<SVGGElement, any, any, any>, elements: Betriebspunkt[]): void {
    const elementCssClass = this.elementCssClass;
    layer.selectAll(elementCssClass)
      .data(elements, (d: Betriebspunkt) => d.text)
      .join(
        enter => enter.append('text').attr('class', elementCssClass),
        update => update,
        exit => exit.remove()
      )
      .attr('x', l => rc.xScale(l.position.x))
      .attr('y', l => rc.yScale(l.position.y))
      .style('text-anchor', labelAlignerFn)
      .text(l => l.text);
  }
}
