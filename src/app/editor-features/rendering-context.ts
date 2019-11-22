import * as d3Scale from 'd3-scale';
import { ScaleLinear } from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { Line } from 'd3-shape';
import { Gleisbild } from '../gleisbild/gleisbild.interface';

export class RenderingContext {

  private readonly _gleisbild: Gleisbild;
  private readonly _xScale: ScaleLinear<any, any>;
  private readonly _yScale: ScaleLinear<any, any>;
  private readonly _lineGenerator: Line<any>;

  constructor(gleisbild: Gleisbild) {
    if (!gleisbild) {
      throw new Error('RenderingContext could not be created because Gleisbild is null or undefined');
    }

    this._gleisbild = gleisbild;
    const bBox = gleisbild.boundingBox;

    this._xScale = d3Scale.scaleLinear().domain([bBox.minX, bBox.maxX]).range([0, bBox.maxX - bBox.minX]);
    this._yScale = d3Scale.scaleLinear().domain([bBox.minY, bBox.maxY]).range([0, bBox.maxY - bBox.minY]);

    this._lineGenerator = d3Shape.line()
      .curve(d3Shape.curveLinear)
      .x((d: any) => this._xScale(d.x))
      .y((d: any) => this._yScale(d.y));
  }

  public get gleisbild(): Gleisbild {
    return this._gleisbild;
  }

  public get xScale(): ScaleLinear<any, any> {
    return this._xScale;
  }

  public get yScale(): ScaleLinear<any, any> {
    return this._yScale;
  }

  public get lineGenerator(): Line<any> {
    return this._lineGenerator;
  }
}
