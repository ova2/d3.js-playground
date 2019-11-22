import { Inject, Injectable, NgZone } from '@angular/core';
import { EDITOR_PROCESSOR, EditorProcessor } from './editor-processor.service';
import { GleisbildElement } from '../gleisbild/gleisbild-element.interface';
import { Gleisbild } from '../gleisbild/gleisbild.interface';
import { EditorZoomingService } from './editor-zooming.service';
import { GleisbildStore } from '../gleisbild/gleisbild.store';
import { HALF_MAX_SURFACE_SIZE, MAX_SURFACE_SIZE } from '../shared/constants';
import { Selection } from 'd3-selection';
import { RenderingContext } from './rendering-context';

@Injectable({
  providedIn: 'root'
})
export class EditorRenderingService {

  private _svg: Selection<SVGSVGElement, any, any, any>;
  private _drawingSurface: Selection<SVGGElement, any, any, any>;
  private _gleisbildSurface: Selection<SVGGElement, any, any, any>;
  private _grid: Selection<SVGRectElement, any, any, any>;

  constructor(@Inject(EDITOR_PROCESSOR) private _processors: EditorProcessor<GleisbildElement>[],
              private _gleisbildStore: GleisbildStore,
              private _ngZone: NgZone,
              private _zoomingService: EditorZoomingService) {
    // sort processors by layer's rendering order
    this._processors.sort((c1, c2) => c1.getLayerIndex() - c2.getLayerIndex());
  }

  public getUnitGrid(): number {
    // grid unit should be configurable in the backend
    return 20;
  }

  public set svg(svg: Selection<SVGSVGElement, any, any, any>) {
    this._svg = svg;
  }

  public set drawingSurface(drawingSurface: Selection<SVGGElement, any, any, any>) {
    this._drawingSurface = drawingSurface;
    this._gleisbildSurface = this._drawingSurface.append('g');
  }

  public setupDrawing(): void {
    this.setupGrid();
    // listen for Gleisbild changes
    this._gleisbildStore.select(state => state).subscribe((gleisbild: Gleisbild) => {
      this.onChangeGleisbild(gleisbild);
    });
  }

  private setupGrid(): void {
    this._grid = this._drawingSurface.append('rect')
      .style('fill', 'url(#grid-pattern)')
      .style('stroke-width', 0)
      .attr('x', -HALF_MAX_SURFACE_SIZE)
      .attr('y', -HALF_MAX_SURFACE_SIZE)
      .attr('width', MAX_SURFACE_SIZE)
      .attr('height', MAX_SURFACE_SIZE);
  }

  private onChangeGleisbild(gleisbild: Gleisbild): void {
    // remove surface for Gleisbild
    this._gleisbildSurface.remove();
    this._gleisbildSurface = this._drawingSurface.append('g');
    if (!gleisbild || !gleisbild.id) {
      this._zoomingService.disableZooming(this._svg, this._drawingSurface);
      return;
    }

    this._gleisbildSurface.attr('data-gleisbild-id', gleisbild.id);
    // create rendering context with Gleisbild specific settings such as scaling function, line generator, etc.
    const rc = new RenderingContext(gleisbild);

    // redefine initial translation
    const translateX = -rc.xScale(gleisbild.initialFocus.x) + (this.svgWidth / 2);
    const translateY = -rc.yScale(gleisbild.initialFocus.y) + (this.svgHeight / 2);
    const initialTransformation = `translate(${translateX} ${translateY})`;

    // draw Gleisbild elements grouped in layers
    this._processors.forEach(p => p.draw(this._gleisbildSurface, rc));

    // enable zooming
    this._ngZone.runOutsideAngular(() => {
      this._zoomingService.enableZooming(this._svg, this._drawingSurface, initialTransformation);
    });
  }

  private get svgWidth(): number {
    return this._svg.node().parentNode.parentElement.offsetWidth;
  }

  private get svgHeight(): number {
    return this._svg.node().parentNode.parentElement.offsetHeight;
  }
}
