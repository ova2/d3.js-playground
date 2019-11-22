import { GleisbildElement } from '../gleisbild/gleisbild-element.interface';
import { InjectionToken } from '@angular/core';
import { Selection } from 'd3-selection';
import { RenderingContext } from './rendering-context';

export const EDITOR_PROCESSOR = new InjectionToken<EditorProcessor<GleisbildElement>>('editor.processor');

export abstract class EditorProcessor<E extends GleisbildElement> {

  private _elementCssClass: string;

  public abstract getCssClass(): string;

  public abstract getLayerIndex(): number;

  public draw(gleisbildSurface: Selection<SVGGElement, any, any, any>, rc: RenderingContext): void {
    // create layer
    const layer: Selection<SVGGElement, any, any, any> = gleisbildSurface.append('g').attr('class', `layer-${this.getCssClass()}`);
    // draw elements inside the layer
    const elements: E[] = this.extractElementsFromGleisbild(rc.gleisbild);
    this.drawElements(rc, layer, elements);
  }

  protected get elementCssClass(): string {
    if (!this._elementCssClass) {
      this._elementCssClass = `element-${this.getCssClass()}`;
    }

    return this._elementCssClass;
  }

  protected extractElementsFromGleisbild(gleisbild: GleisbildElement): E[] {
    return [];
  }

  protected abstract drawElements(rc: RenderingContext, layer: Selection<SVGGElement, any, any, any>, elements: E[]): void;
}
