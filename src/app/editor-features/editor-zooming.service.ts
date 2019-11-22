import { Injectable } from '@angular/core';
import * as d3 from 'd3-selection';
import { Selection } from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import { ZoomBehavior } from 'd3-zoom';
import { HALF_MAX_SURFACE_SIZE, SCALE_MAX_FACTOR, SCALE_MIN_FACTOR } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class EditorZoomingService {

  private readonly _zoomBehavior: ZoomBehavior<any, any>;

  constructor() {
    this._zoomBehavior = d3Zoom.zoom()
      .scaleExtent([SCALE_MIN_FACTOR, SCALE_MAX_FACTOR])
      .translateExtent([[-HALF_MAX_SURFACE_SIZE, -HALF_MAX_SURFACE_SIZE], [HALF_MAX_SURFACE_SIZE, HALF_MAX_SURFACE_SIZE]])
      .on('zoom', null);
  }

  public enableZooming(svg: Selection<SVGSVGElement, any, any, any>, drawingSurface: Selection<SVGGElement, any, any, any>, initialTransformation: string): void {
    this.disableZooming(svg, drawingSurface);
    drawingSurface.attr('transform', initialTransformation);

    const zoomHandler = () => drawingSurface.attr('transform', `${d3.event.transform} ${initialTransformation}`);
    this._zoomBehavior.on('zoom', zoomHandler);

    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('class', 'zoom-area')
      .call(this._zoomBehavior);
  }

  public disableZooming(svg: Selection<SVGSVGElement, any, any, any>, drawingSurface: Selection<SVGGElement, any, any, any>): void {
    this._zoomBehavior.on('zoom', null);
    svg.select('rect.zoom-area').remove();
    drawingSurface.attr('transform', null);
  }
}
