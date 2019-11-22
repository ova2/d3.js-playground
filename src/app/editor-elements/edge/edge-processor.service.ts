import { Injectable } from '@angular/core';
import { EditorProcessor } from '../../editor-features/editor-processor.service';
import { Edge } from './edge.interface';
import { Gleisbild } from '../../gleisbild/gleisbild.interface';
import { Selection } from 'd3-selection';
import { RenderingContext } from '../../editor-features/rendering-context';

@Injectable()
export class EdgeProcessor extends EditorProcessor<Edge> {

  public getCssClass(): string {
    return 'edge';
  }

  public getLayerIndex(): number {
    return 20;
  }

  protected extractElementsFromGleisbild(gleisbild: Gleisbild): Edge[] {
    return gleisbild.edges;
  }

  protected drawElements(rc: RenderingContext, layer: Selection<SVGGElement, any, any, any>, elements: Edge[]): void {
    const elementCssClass = this.elementCssClass;
    layer.selectAll(elementCssClass)
      .data(elements, (d: Edge) => d.id)
      .join(
        enter => enter.append('path').attr('class', elementCssClass),
        update => update,
        exit => exit.remove()
      )
      .attr('d', e => rc.lineGenerator(e.pfad));
  }
}
