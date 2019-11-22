import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3-selection';
import { EditorRenderingService } from '../editor-features/editor-rendering.service';

@Component({
  selector: 'ssp-editor-core',
  templateUrl: './editor-core.component.html',
  styleUrls: ['./editor-core.component.scss']
})
export class EditorCoreComponent implements OnInit {

  public gridUnit: number;

  constructor(private _renderingService: EditorRenderingService) {
  }

  @ViewChild('svg', {static: true})
  public set svg(elementRef: ElementRef) {
    this._renderingService.svg = d3.select(elementRef.nativeElement as SVGSVGElement);
  }

  @ViewChild('drawingSurface', {static: true})
  public set drawingSurface(elementRef: ElementRef) {
    this._renderingService.drawingSurface = d3.select(elementRef.nativeElement as SVGGElement);
  }

  public ngOnInit(): void {
    this.gridUnit = this._renderingService.getUnitGrid();
    this._renderingService.setupDrawing();
  }
}
