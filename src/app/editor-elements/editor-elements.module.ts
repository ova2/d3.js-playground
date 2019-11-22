import { EdgeModule } from './edge/edge.module';
import { SignalModule } from './signal/signal.module';
import { NgModule } from '@angular/core';
import { EDITOR_PROCESSOR } from '../editor-features/editor-processor.service';
import { EdgeProcessor } from './edge/edge-processor.service';
import { HauptsignalProcessor } from './signal/hauptsignal-processor.service';
import { BetriebspunktModule } from './betriebspunkt/betriebspunkt.module';
import { BetriebspunktProcessor } from './betriebspunkt/betriebspunkt-processor.service';

@NgModule({
  providers: [
    {
      provide: EDITOR_PROCESSOR,
      useClass: BetriebspunktProcessor,
      multi: true
    },
    {
      provide: EDITOR_PROCESSOR,
      useClass: EdgeProcessor,
      multi: true
    },
    {
      provide: EDITOR_PROCESSOR,
      useClass: HauptsignalProcessor,
      multi: true
    }
  ],
  imports: [
    BetriebspunktModule,
    EdgeModule,
    SignalModule
  ]
})
export class EditorElementsModule {
}
